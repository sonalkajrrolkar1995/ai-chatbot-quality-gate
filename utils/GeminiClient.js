const fetch = require('node-fetch');

class GeminiClient {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

    if (!this.apiKey) {
      throw new Error('GEMINI_API_KEY environment variable not set');
    }
  }

  async sendPrompt(prompt, maxTokens = 200) {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': this.apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: maxTokens,
            temperature: 0.7,
          },
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`API Error: ${error.error?.message || response.statusText}`);
      }

      const data = await response.json();
      const textContent = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!textContent) {
        throw new Error('No text content in response');
      }

      return textContent;
    } catch (error) {
      throw new Error(`Gemini API call failed: ${error.message}`);
    }
  }

  async testConnection() {
    try {
      const response = await this.sendPrompt('Hello, are you working?', 10);
      return response.length > 0;
    } catch (error) {
      return false;
    }
  }
}

module.exports = GeminiClient;

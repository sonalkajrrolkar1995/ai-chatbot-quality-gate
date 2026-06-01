class ChatbotPage {
  constructor(page) {
    this.page = page;

    this.chatInput = page.getByTestId('chat-input') || page.getByPlaceholder('Type your message');
    this.sendButton = page.getByRole('button', { name: /send|submit/i });
    this.chatMessages = page.locator('[data-testid="chat-message"]');
    this.lastMessage = this.chatMessages.last();
    this.errorMessage = page.locator('[role="alert"]');
    this.loadingIndicator = page.locator('[data-testid="loading"]');
  }

  async sendPrompt(prompt) {
    await this.chatInput.fill(prompt);
    await this.sendButton.click();
    await this.page.waitForTimeout(500);
  }

  async getLastResponse() {
    await this.page.waitForSelector('[data-testid="chat-message"]', { timeout: 5000 });
    return await this.lastMessage.textContent();
  }

  async getResponseTime(startTime) {
    const endTime = Date.now();
    return (endTime - startTime) / 1000;
  }

  async clearChat() {
    const clearButton = this.page.getByRole('button', { name: /clear|reset/i });
    if (await clearButton.isVisible()) {
      await clearButton.click();
    }
  }

  async isResponseVisible() {
    return await this.lastMessage.isVisible({ timeout: 3000 });
  }

  async hasError() {
    return await this.errorMessage.isVisible({ timeout: 1000 }).catch(() => false);
  }

  async getErrorText() {
    return await this.errorMessage.textContent();
  }
}

module.exports = ChatbotPage;

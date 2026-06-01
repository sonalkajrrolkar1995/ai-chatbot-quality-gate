const { expect } = require('@playwright/test');

class GeminiPage {
  constructor(page) {
    this.page = page;
    this.chatInput = page.locator('div[contenteditable="true"]').first();
    this.sendButton = page.locator('button[aria-label="Send message"]');
    this.responseContainer = page.locator('model-response').last();
    this.responseText = page.locator('model-response .markdown').last();
  }

  async navigate() {
    await this.page.goto('https://gemini.google.com');
    await expect(this.chatInput).toBeVisible({ timeout: 15000 });
  }

  async sendMessage(text) {
    await this.chatInput.click();
    await this.chatInput.fill(text);
    await this.sendButton.click();
  }

  async waitForResponse() {
    await expect(this.responseText).toBeVisible({ timeout: 30000 });
    await this.page.waitForFunction(() => {
      const el = document.querySelector('model-response .markdown');
      return el && el.innerText.trim().length > 10;
    }, { timeout: 30000 });
  }

  async getLastResponseText() {
    const all = await this.page.locator('model-response .markdown').all();
    if (all.length === 0) return '';
    return await all[all.length - 1].innerText();
  }

  async startNewChat() {
    const newChatBtn = this.page.locator('a[aria-label="New chat"], button[aria-label="New chat"]').first();
    if (await newChatBtn.isVisible()) {
      await newChatBtn.click();
      await expect(this.chatInput).toBeVisible({ timeout: 10000 });
    }
  }
}

module.exports = GeminiPage;

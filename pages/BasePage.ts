import { Page } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string = '/') {
    await this.page.goto(url);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickElementByRole(role: any, name: string) {
    await this.page.getByRole(role, { name }).click();
  }

  async fillField(selector: string, value: string) {
    await this.page.locator(selector).fill(value);
  }
}

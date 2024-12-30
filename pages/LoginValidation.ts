// /pages/LoginPage.ts
import { expect } from 'playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private usernameField = '#loginusername';
  private passwordField = '#loginpassword';

  async login(username: string, password: string) {
    let dialogMessage: string | null = null;

    this.page.on('dialog', async (dialog) => {
      dialogMessage = dialog.message(); // Capture the dialog message
      await dialog.accept(); // Accept the dialog
    });
    await this.clickElementByRole('link', 'Log in');
    await this.page.locator(this.usernameField).fill(username);
    await this.page.locator(this.passwordField).fill(password);
    await this.page.click('button:has-text("Log in")');
    // Wait and check for a dialog
    await this.page.waitForTimeout(2000); // Small delay to ensure the dialog appears    
    return dialogMessage;
  }

  async validateLogin(username: string) {
    await this.page.waitForSelector('#nameofuser');
    await this.page.locator('#nameofuser').waitFor({ state: 'visible' });
    // Verify the welcome message
    await expect(this.page.locator('#nameofuser')).toHaveText('Welcome sarath152');
    await this.page.locator('#logout2').click();
  }
  async closeLoginField() {
    await this.page.locator("div[id='logInModal'] span[aria-hidden='true']").click();
  }
  //if option has logout else ignore.
  async logout() {
    if (this.page.locator('button:has-text("Log out")')) {
      await this.page.locator('button:has-text("Log out")').click();
    }
  }
}


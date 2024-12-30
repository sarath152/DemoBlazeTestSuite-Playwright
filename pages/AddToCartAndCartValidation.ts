// /pages/CartPage.ts
import { expect } from 'playwright/test';
import { BasePage } from './BasePage';

interface OrderDetails {
  name: string;
  country: string;
  city: string;
  creditCard: string;
  month: string;
  year: string;
}

export class CartPage extends BasePage {
  async validateCartItems(expectedItems: string[]) {
    await this.page.locator('#cartur').click();
    await this.page.locator("(//tr[@class='success'])//td[2]").first().waitFor({ state: 'visible' });
    const cartContent = await this.page.locator("(//tr[@class='success'])//td[2]").allTextContents();
    // Validate if each expected item is part of the cart content
    expectedItems.forEach((item) => {
      expect(cartContent).toContain(item); // Ensure each item is contained within the cart text
    });
  }



  async placeOrder(details: OrderDetails) {
    await this.page.waitForTimeout(5000);
    await this.fillField('input[id="name"]', details.name);
    await this.fillField('input[id="country"]', details.country);
    await this.fillField('input[id="city"]', details.city);
    await this.fillField('input[id="card"]', details.creditCard);
    await this.fillField('input[id="month"]', details.month);
    await this.fillField('input[id="year"]', details.year);
    await this.page.waitForLoadState();
    const lead = this.page.locator(".lead");
    await lead.waitFor({ state: 'visible' });

    // Get all inner text values from the invoice elements
    const totalInInvoice = await this.page.locator(".lead").allInnerTexts();
    console.log(totalInInvoice);
  }
}

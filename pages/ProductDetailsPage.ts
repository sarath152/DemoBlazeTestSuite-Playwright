// /pages/ProductDetailsPage.ts
import { expect } from '@playwright/test';

export class ProductDetailsPage {
  private page;

  constructor(page) {
    this.page = page;
  }

  async navigateToHomePage() {
    await this.page.goto('https://www.demoblaze.com');
  }

  async selectCategory(category: string) {
    await this.page.locator(`text=${category}`).click();
    await this.page.waitForSelector('.card-block'); // Wait for the products to load
  }

  async getItemsCount() {
    return await this.page.locator('.card-block').count();
  }

  async extractProductDetails(index: number) {
    //add wait 2 sec
    await this.page.waitForTimeout(2000);
    const items = this.page.locator('.card-block');

    const productName = await items.nth(index).locator('.card-title').textContent();
    await this.page.locator('h4.card-title').nth(1).visible
    const productPrice = await items.nth(index).locator('h5').textContent();
    const productDescription = await items.nth(index).locator('.card-text').textContent();
    return { productName, productPrice, productDescription };
  }

  async clickProduct(index: number) {
    const items = this.page.locator('.card-block');
    await items.nth(index).locator('.hrefch').click();
    await this.page.waitForSelector('#tbodyid'); // Wait for product detail page to load
  }

  async validateProductDetails(expectedName: string, expectedPrice: string, expectedDescription: string) {
    const detailName = await this.page.locator('#tbodyid .name').textContent();
    const detailPrice = await this.page.locator('#tbodyid .price-container').textContent();
    const detailDescription = await this.page.locator('#tbodyid .description').textContent();
    expect(detailName).toContain(expectedName?.trim());
    expect(detailPrice).toContain(expectedPrice?.trim());
    expect(detailDescription).toContain(expectedDescription?.trim());


  }
}
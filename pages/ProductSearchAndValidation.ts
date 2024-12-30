import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductSearchAndValidation extends BasePage {
  constructor(public page: Page) {
    super(page);
  }

  /**
   * Selects a category by clicking its link.
   * @param category - Name of the category to select
   */
  async selectCategory(category: string) {
    await this.clickElementByRole('link', category);
  }

  /**
   * Selects a product by filtering cards with matching names.
   * @param productName - Name of the product to select
   */
  async selectProduct(productName: string) {
    //wait to select
    await this.page.waitForLoadState('networkidle')
    await this.page.locator('.card-title').filter({ hasText: productName }).click();
  }

  /**
   * Adds the selected product to the cart and handles the confirmation dialog.
   */
  async addToCart() {
    const addToCartButton = this.page.locator("//a[normalize-space()='Add to cart']");
    await addToCartButton.waitFor({ state: 'visible' });
    await addToCartButton.click();
    //wait for to complete the click action
    await this.page.waitForTimeout(1000);


  }

  /**
   * Validates the product page by verifying the title.
   * @param productName - Expected product name
   */
  async validateProductPage(productName: string) {
    await this.page.waitForSelector('h2');
    await expect(this.page.locator('h2')).toHaveText(productName);
  }

  /**
   * Validates the product page by comparing a screenshot.
   * @param productName - Name used for the screenshot file
   */
  async validateProductPageUsingScreenshot(productName: string) {
    (await this.page.waitForSelector('h2')).isVisible();
    const productElement = await this.page.locator('.product-deatil').screenshot();
    expect(productElement).toMatchSnapshot(`product-page-${productName}.png`);
  }
}

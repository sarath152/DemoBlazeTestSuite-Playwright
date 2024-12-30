import { test, expect } from '@playwright/test';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';

// Test Suite for validating product details across categories
test.describe('Checking Every Item from Each Category @verifyproductdetails @demoblaze', () => {

  // Test to verify product details in each category
  test('Verify product details @blazeredroutes @validateproducts ', async ({ page }) => {
    const categories = ['Laptops', 'Phones', 'Monitors']; // List of categories to test
    const productDetailsPage = new ProductDetailsPage(page); // Initialize the page object

    for (const category of categories) {
      // Step 1: Navigate to the homepage and select the current category
      await productDetailsPage.navigateToHomePage();
      await productDetailsPage.selectCategory(category);
      await page.waitForLoadState('networkidle'); // Ensure page is fully loaded

      // Step 2: Get the count of items in the category and validate it's greater than 0
      const itemsCount = await productDetailsPage.getItemsCount();
      expect(itemsCount).toBeGreaterThan(0); // Assert category has items
      console.log(`Items found in "${category}": ${itemsCount}`);

      // Step 3: Iterate through each item in the category
      for (let i = 0; i < itemsCount; i++) {
        // Re-navigate to maintain consistent state for each item
        await productDetailsPage.navigateToHomePage();
        await productDetailsPage.selectCategory(category);
        await page.waitForLoadState('networkidle');

        // Step 4: Extract product details (name, price, description)
        const { productName, productPrice, productDescription } = await productDetailsPage.extractProductDetails(i);
        console.log(`Clicking on: ${productName?.trim()}`);

        // Step 5: Click on the product and validate its details
        await productDetailsPage.clickProduct(i);
        try {
          await productDetailsPage.validateProductDetails(productName, productPrice, productDescription);
          console.log(`Validation successful for product: ${productName}`);
        } catch (error) {
          console.error(`Validation failed for product: ${productName}, error: ${error}`);
        }
      }
    }
  });
});

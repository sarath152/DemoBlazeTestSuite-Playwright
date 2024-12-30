import { test, expect } from '@playwright/test'; 
import { ProductSearchAndValidation } from '../pages/ProductSearchAndValidation';

// Dynamic values for testing scenarios
const baseURL = '/'; // Base URL of the application
const categories = ['Phones', 'Laptops', 'Monitors']; // Product categories to test
const products = {
  phones: 'HTC One M9',
  laptops: 'Sony vaio i5',
  monitors: 'Apple monitor 24',
}; 

// Run before each test: Navigate to the base URL
test.beforeEach(async ({ page }) => {
  await page.goto(baseURL); 
});

test.describe('Product Search and Validation Tests @productsearch&validation @demoblaze', () => {
  
  // Test: Add phone to cart and validate page
  test(`Add ${products.phones} to Cart & Validate Page @validatepage @blazeredroutes`, async ({ page }) => {
    const productPage = new ProductSearchAndValidation(page);
    await productPage.selectCategory(categories[0]); // Select 'Phones'
    await productPage.selectProduct(products.phones); // Choose 'HTC One M9'
    await productPage.addToCart(); // Add product to cart
    await productPage.validateProductPage(products.phones); // Validate page by title
  });

  // Test: Add laptop to cart and validate via screenshot
  test(`Add ${products.laptops} to Cart & Validate Screenshot @validatescreenshot @blazeredroutes`, async ({ page }) => {
    const productPage = new ProductSearchAndValidation(page);
    await productPage.selectCategory(categories[1]); // Select 'Laptops'
    await productPage.selectProduct(products.laptops); // Choose 'Sony vaio i5'
    await productPage.addToCart(); // Add to cart
    await productPage.validateProductPageUsingScreenshot(products.laptops); // Compare with screenshot
  });

  // Test: Add monitor to cart and validate DOM elements
  test(`Add ${products.monitors} to Cart & Validate DOM Elements @validatedom`, async ({ page }) => {
    const productPage = new ProductSearchAndValidation(page);
    await productPage.selectCategory(categories[2]); // Select 'Monitors'
    await productPage.selectProduct(products.monitors); // Choose 'Apple monitor 24'
    await productPage.addToCart(); // Add to cart

    // Validate DOM content (product name and price)
    const productName = await page.locator('.name').textContent();
    const productPrice = await page.locator('.price-container').textContent();
    expect(productName?.trim()).toBe(products.monitors); // Assert product name
    expect(productPrice).not.toBeNull(); // Assert product price is not null
  });

  // Test: Add monitor to cart and validate via API response
  test(`Add ${products.monitors} to Cart & Validate via API @validateapi`, async ({ page }) => {
    const productPage = new ProductSearchAndValidation(page);
    await productPage.selectCategory(categories[2]); // Select 'Monitors'
    await productPage.selectProduct(products.monitors); // Choose 'Apple monitor 24'
    await productPage.addToCart(); // Add to cart

    // Listen for API response to validate product details
    page.on('response', async (response) => {
      if (response.url().includes('/product-details')) {
        const productDetails = await response.json();
        expect(productDetails.name).toBe(products.monitors); // Validate product name from API
        expect(productDetails.price).not.toBeNull(); // Validate product price from API
      }
    });
  });
});

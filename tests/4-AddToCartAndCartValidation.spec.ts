import { test, expect } from '@playwright/test';
import { ProductSearchAndValidation } from '../pages/ProductSearchAndValidation.ts';
import { ai } from '@zerostep/playwright';
import { CartPage } from '../pages/AddToCartAndCartValidation.ts';
import { generateOrderDetails } from '../utils/fakerUtils.ts';

// Constants for dynamic test scenarios
const baseURL = '/'; // Application's base URL
const categories = ['Phones', 'Laptops', 'Monitors']; // Product categories
const products = {
  phones: 'HTC One M9',
  laptops: 'Sony vaio i5',
  monitors: 'Apple monitor 24',
}; // Product details

// Navigate to base URL before each test
test.beforeEach(async ({ page }) => {
  await page.goto(baseURL);
  await page.waitForLoadState('networkidle');
});

test.describe('Cart Functionality Tests @cartvalidation @demoblaze', () => {

  test('Verify product details in cart using AI @verifyproductdetails @blazeredroutes  ', async ({ page }) => {
    const aiArgs = { page, test };

    // Navigate and select a product
    await ai('Click on the product named "Nexus 6".', aiArgs);

    // Capture product price and add it to the cart
    await page.waitForLoadState('networkidle');
    const actualPrice = await ai('Get the price of the product.', aiArgs);
    await ai('Click on the "Add to cart" button.', aiArgs);

    // Navigate to cart and validate details
    await ai('Click on the "cart" button available in header.', aiArgs);
    await page.waitForLoadState('networkidle');
    const productName = await ai('Get the name of the product in the cart.', aiArgs);
    const productPrice = await ai('Get the price of the product in the cart.', aiArgs);

    // Validate product details
    expect(productName).toBe('Nexus 6');
    expect(`$${productPrice}`).toContain(actualPrice);
  });

  test('Validating product addition to cart @verifycartcount', async ({ page }) => {
    const aiArgs = { page, test };
    const productPage = new ProductSearchAndValidation(page);

    // Add a product to the cart
    await productPage.selectCategory(categories[0]);
    await productPage.selectProduct(products.phones);
    await productPage.addToCart();

    // Verify cart count using AI
    await page.locator('#cartur').click();
    await page.waitForLoadState('networkidle');
    const cartCount = await ai('Verify the cart count.', aiArgs);
    expect(cartCount).toBeTruthy();
  });

  test('Add multiple products to cart and verify @multipleproducttocart', async ({ page }) => {
    const productPage = new ProductSearchAndValidation(page);

    // Add multiple products
    for (let i = 0; i < categories.length; i++) {
      await page.goto('/');
      await productPage.selectCategory(categories[i]);
      await productPage.selectProduct(Object.values(products)[i]);
      await page.waitForLoadState('networkidle');
      await productPage.addToCart();
    }

    // Verify cart details
    await page.locator('#cartur').click();
    await page.waitForLoadState('networkidle');
    const cartItems = page.locator('.success');
    expect(await cartItems.count()).toBe(3);
  });

  test('Verify checkout flow @checkoutflow @blazeredroutes ', async ({ page }) => {
    const aiArgs = { page, test };
    const productPage = new ProductSearchAndValidation(page);
    const cartPage = new CartPage(page);
    const orderDetails = generateOrderDetails();

    // Add products and proceed to checkout
    for (const category in products) {
      await page.goto('/');
      await productPage.selectCategory(category);
      await productPage.selectProduct(products[category]);
      await page.waitForLoadState('networkidle');
      await productPage.addToCart();
    }

    // Go to Cart
    (await page.waitForSelector('#cartur')).isVisible();
    await page.locator('#cartur').click();
    await page.waitForLoadState('networkidle');

    //click Place Order
    await page.locator('.btn-success').click();



    //Verifing the Empty Form Scenario's
    await page.locator("//button[normalize-space()='Purchase']").click();

    //log the alert message from dialog box
    const dialogResult = await ai('Handle the dialog box and provide input if necessary', aiArgs);
    console.log('Dialog Result:', dialogResult)


    await ai('Fill out the form with realistic values.', aiArgs);


    //Note : we can use faker.js to fill the form as well - 
    //await cartPage.placeOrder(orderDetails);

    await page.locator("//button[normalize-space()='Purchase']").click();

    // Log order confirmation
    const confirmationId = await ai('Capture the order confirmation ID.', aiArgs);
    console.log('Order ID:', confirmationId);
  });

  test('Remove product from cart @removefromcart', async ({ page }) => {
    const aiArgs = { page, test };
    const productPage = new ProductSearchAndValidation(page);

    // Add products to the cart
    for (const category in products) {
      await page.goto('/');
      await productPage.selectCategory(category);
      await productPage.selectProduct(products[category]);
      await productPage.addToCart();
    }

    // Remove a product and verify
    await page.locator('#cartur').click();
    const beforeRemove = await ai('Get details of all products in the cart.', aiArgs);
    await ai('Remove the first product from the cart.', aiArgs);
    const afterRemove = await ai('Verify the product is removed from the cart.', aiArgs);
    console.log({ beforeRemove, afterRemove });
  });

  test('Empty the cart and verify @emptycart', async ({ page }) => {
    const aiArgs = { page, test };
    const productPage = new ProductSearchAndValidation(page);

    // Add products and empty cart
    await page.goto('/');
    await productPage.selectCategory(categories[0]);
    await productPage.selectProduct(products.phones);
    await productPage.addToCart();


    await page.locator('#cartur').click();
    await page.waitForLoadState('networkidle');
    // Verify the number of items in the cart
    const cartItems = page.locator('.success');
    expect(await cartItems.count()).toBe(1); // Verify the cart has 1 items
    // Verify the names of the products in the cart
    (await page.waitForSelector('.success')).isVisible();
    //remove all products
    const removeall = await ai('Remove all products from the cart', aiArgs);
    // Verify the cart is empty
    await page.waitForLoadState('networkidle');
    const emptycart = await ai('Verify the cart is empty', aiArgs);
    expect(await cartItems.count()).toBe(0); // Verify the cart has 3 items

  });
});

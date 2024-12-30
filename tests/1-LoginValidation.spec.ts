// /tests/login.spec.ts
import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginValidation';

// Test data for login scenarios
const baseURL = '/';
const validUsername = 'sarath152';
const validPassword = '123456';
const invalidPassword = '12345678';
const emptyUsername = '';
const emptyPassword = '';
const invalidLoginMessage = 'Wrong password.';
const emptyLoginMessage = 'Please fill out Username and Password.';

// Navigate to the base URL before each test
test.beforeEach(async ({ page }) => {
  await page.goto(baseURL);
});

// Login test scenarios

test.describe('Login Scenarios Validation @demoblaze @loginvalidation', () => {

  test('Valid login @validlogin @demoblazelogin @blazeredroutes', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(validUsername, validPassword);
    await loginPage.validateLogin(validUsername);
  });

  test('Invalid login with incorrect password @invalidlogin @demoblazelogin', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dialogMessage = await loginPage.login(validUsername, invalidPassword);
    expect(dialogMessage).toBe(invalidLoginMessage);
    await loginPage.closeLoginField();
  });

  test('Empty login credentials @emptylogin @demoblazelogin', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dialogMessage = await loginPage.login(emptyUsername, emptyPassword);
    expect(dialogMessage).toBe(emptyLoginMessage);
    await loginPage.closeLoginField();
  });

});

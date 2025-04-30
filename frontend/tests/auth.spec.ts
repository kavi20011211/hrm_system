import { test, expect } from '@playwright/test';

test.describe('Authentication Tests', () => {
  test('should allow a user to log in successfully', async ({ page }) => {
    // Navigate to the login page
    await page.goto('http://localhost:5173/login');

    // Wait for the email input to be visible to ensure the form is loaded
    await expect(page.locator('input[name="email"]')).toBeVisible(); 

    // Fill in the email
    await page.locator('input[name="email"]').fill('easaraivanjaya24@gmail.com');

    // Fill in the password
    await page.locator('input[name="password"]').fill('Test123');

    // Click the sign-in button
    await page.locator('button[type="submit"]:has-text("Sign in")').click();

    // Wait for navigation to the dashboard (root path '/') after successful login
    await page.waitForURL('http://localhost:5173/');

    // Assert that the URL is the dashboard URL
    expect(page.url()).toBe('http://localhost:5173/');

    // Optional: Add an assertion to check for an element unique to the dashboard
    // For example, if the dashboard has a specific heading or component:
    // await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible();
  });

  test('should show error with incorrect password', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await expect(page.locator('input[name="email"]')).toBeVisible();

    await page.locator('input[name="email"]').fill('easaraivanjaya24@gmail.com');
    await page.locator('input[name="password"]').fill('WrongPassword123');
    await page.locator('button[type="submit"]:has-text("Sign in")').click();

    // Wait for the error toast notification to appear
    await expect(page.locator('.Toastify__toast--error')).toBeVisible();
    // Check for specific error text (adjust if backend message differs)
    await expect(page.locator('.Toastify__toast--error')).toContainText('Invalid email or password'); 
    
    // Ensure user stays on the login page
    expect(page.url()).toBe('http://localhost:5173/login');
  });

  test('should show error with non-existent email', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await expect(page.locator('input[name="email"]')).toBeVisible();

    await page.locator('input[name="email"]').fill('nonexistent@example.com');
    await page.locator('input[name="password"]').fill('Test123');
    await page.locator('button[type="submit"]:has-text("Sign in")').click();

    await expect(page.locator('.Toastify__toast--error')).toBeVisible();
    // Check for specific error text (adjust if backend message differs)
    await expect(page.locator('.Toastify__toast--error')).toContainText('Invalid email or password'); 

    expect(page.url()).toBe('http://localhost:5173/login');
  });

  test('should show error with empty email field', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await expect(page.locator('input[name="email"]')).toBeVisible();

    // Leave email empty
    await page.locator('input[name="password"]').fill('Test123');
    await page.locator('button[type="submit"]:has-text("Sign in")').click();

    await page.locator('.Toastify__toast--error').waitFor({ state: 'visible', timeout: 5000 }); 
    await expect(page.locator('.Toastify__toast--error')).toContainText('Email is required');

    expect(page.url()).toBe('http://localhost:5173/login');
  });

  test('should show error with empty password field', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await expect(page.locator('input[name="email"]')).toBeVisible();

    await page.locator('input[name="email"]').fill('easaraivanjaya24@gmail.com');
    // Leave password empty
    await page.locator('button[type="submit"]:has-text("Sign in")').click();

    await page.locator('.Toastify__toast--error').waitFor({ state: 'visible', timeout: 5000 }); 
    await expect(page.locator('.Toastify__toast--error')).toContainText('Password is required');

    expect(page.url()).toBe('http://localhost:5173/login');
  });

  // Add more tests here (e.g., login failure, navigation checks)
});

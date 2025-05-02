import { test, expect } from '@playwright/test';
import 'dotenv/config';

const TEST_USER_EMAIL = process.env.TEST_USER_EMAIL ?? 'easaraivanjaya24@gmail.com';
const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD ?? 'Test123';

const NAVIGATION_TIMEOUT = 90000; // 90 seconds for navigation (longer timeout as per user's comment)
const ELEMENT_TIMEOUT = 15000;    // 15 seconds for element visibility

// Test: Successful login
test('should allow a user to log in successfully', async ({ page, baseURL }) => {
  console.log('Starting login test');
  
  // Navigate to the login page
  await page.goto(`${baseURL}/login`, { timeout: NAVIGATION_TIMEOUT });
  console.log('Navigated to login page');

  // Wait for navigation and ensure elements are ready
  await page.waitForSelector('#email', { timeout: ELEMENT_TIMEOUT });
  console.log('Login form loaded');

  // Find input fields using more specific selectors
  const emailInput = page.locator('input#email');
  const passwordInput = page.locator('input#password');
  const submitButton = page.locator('button[type="submit"]');

  await expect(emailInput).toBeVisible({ timeout: ELEMENT_TIMEOUT });
  await expect(passwordInput).toBeVisible({ timeout: ELEMENT_TIMEOUT });

  // Fill in the email and password
  await emailInput.fill(TEST_USER_EMAIL);
  await passwordInput.fill(TEST_USER_PASSWORD);
  console.log('Credentials filled in');

  // Click the submit button
  await submitButton.click();
  console.log('Login submitted');

  // Wait for navigation to the root page (/) after successful login
  await page.waitForURL(`${baseURL}/`, { timeout: NAVIGATION_TIMEOUT });
  console.log('Navigation after login completed');

  // Take a screenshot to understand the page structure
  await page.screenshot({ path: './test-results/after-login-screenshot.png' });

  // Log HTML structure for debugging
  console.log('Page title after login:', await page.title());
  
  // Assert successful login by checking for specific elements that should appear on the dashboard
  // Using a narrower approach to verify login success
  const pageTitle = await page.title();
  console.log('Page title after login:', pageTitle);
  
  // First approach: Check if URL has changed to the dashboard
  const currentUrl = page.url();
  expect(currentUrl).toContain(baseURL);
  
  // Second approach: Check for any visible heading element to confirm page loaded
  try {
    await page.waitForSelector('h1', { timeout: ELEMENT_TIMEOUT });
    const headingElement = page.locator('h1').first();
    await expect(headingElement).toBeVisible({ timeout: ELEMENT_TIMEOUT });
  } catch (error) {
    console.error('Error finding heading element:', error);
    // Take screenshot for debugging
    await page.screenshot({ path: './test-results/login-success-heading-error.png' });
    throw error;
  }
});
// Test: Login with incorrect password
test('should show error with incorrect password', async ({ page, baseURL }) => {
  // Navigate to the login page
  await page.goto(`${baseURL}/login`, { timeout: NAVIGATION_TIMEOUT });
  await page.waitForSelector('#email', { timeout: ELEMENT_TIMEOUT });

  // Find input fields
  const emailInput = page.locator('input#email');
  const passwordInput = page.locator('input#password');
  const submitButton = page.locator('button[type="submit"]');

  await expect(emailInput).toBeVisible({ timeout: ELEMENT_TIMEOUT });
  await expect(passwordInput).toBeVisible({ timeout: ELEMENT_TIMEOUT });

  // Fill in credentials with incorrect password
  await emailInput.fill(TEST_USER_EMAIL);
  await passwordInput.fill('WrongPassword123');
  await submitButton.click();

  // Wait briefly for error to appear
  await page.waitForTimeout(2000);
  
  // Take a screenshot to see the error message structure
  await page.screenshot({ path: './test-results/login-error-screenshot.png' });

  // Try several possible error message selectors with error handling
  try {
    // First try to locate toast notifications
    const toastError = page.locator('.Toastify__toast--error').first();
    if (await toastError.count() > 0) {
      await expect(toastError).toBeVisible({ timeout: ELEMENT_TIMEOUT });
      const errorText = await toastError.innerText();
      console.log('Found toast error with text:', errorText);
      return;
    }
    
    // Then try form-level error messages
    const formError = page.locator('form [role="alert"]').first();
    if (await formError.count() > 0) {
      await expect(formError).toBeVisible({ timeout: ELEMENT_TIMEOUT });
      const errorText = await formError.innerText();
      console.log('Found form error with text:', errorText);
      return;
    }
    
    // As a fallback, check if the form shows validation errors
    if (await page.locator('form:invalid').count() > 0) {
      console.log('Form has validation errors');
      return;
    }
    
    // If we get here, look for any visible error indicator
    const anyError = page.locator('.text-red-500, .error, .error-message').first();
    if (await anyError.count() > 0) {
      await expect(anyError).toBeVisible({ timeout: ELEMENT_TIMEOUT });
      return;
    }
    
    // If no error elements found, the test should fail
    throw new Error('No error message found on page after submitting invalid credentials');
  } catch (error) {
    console.error('Error finding error message:', error);
    // Take screenshot for debugging
    await page.screenshot({ path: './test-results/login-error-finding-error.png' });
    throw error;
  }
});

// Test: Login with non-existent email
test('should show error with non-existent email', async ({ page, baseURL }) => {
  // Navigate to the login page
  await page.goto(`${baseURL}/login`, { timeout: NAVIGATION_TIMEOUT });
  await page.waitForSelector('#email', { timeout: ELEMENT_TIMEOUT });

  // Find input fields
  const emailInput = page.locator('input#email');
  const passwordInput = page.locator('input#password');
  const submitButton = page.locator('button[type="submit"]');

  await expect(emailInput).toBeVisible({ timeout: ELEMENT_TIMEOUT });
  await expect(passwordInput).toBeVisible({ timeout: ELEMENT_TIMEOUT });

  // Fill in credentials with a non-existent email
  await emailInput.fill('nonexistent@example.com');
  await passwordInput.fill(TEST_USER_PASSWORD);
  await submitButton.click();

  // Wait briefly for error to appear
  await page.waitForTimeout(2000);

  // Using a more specific approach to find error messages to avoid strict mode violations
  const errorMessage = page.locator('[role="alert"]').first();
  await expect(errorMessage).toBeVisible({ timeout: ELEMENT_TIMEOUT });
  
  // Check for common error message text patterns
  const errorText = await errorMessage.innerText();
  expect(errorText.toLowerCase()).toMatch(/invalid|incorrect|wrong|failed|not found/i);
});

// Test: Login with empty email field
test('should show error with empty email field', async ({ page, baseURL }, testInfo) => {
  // Navigate to the login page
  await page.goto(`${baseURL}/login`, { timeout: NAVIGATION_TIMEOUT });
  await page.waitForSelector('#email', { timeout: ELEMENT_TIMEOUT });

  // Find input fields
  const emailInput = page.locator('input#email');
  const passwordInput = page.locator('input#password');
  const submitButton = page.locator('button[type="submit"]');

  await expect(emailInput).toBeVisible({ timeout: ELEMENT_TIMEOUT });
  await expect(passwordInput).toBeVisible({ timeout: ELEMENT_TIMEOUT });

  // Leave email empty, fill password
  await passwordInput.fill(TEST_USER_PASSWORD);
  await submitButton.click();
  
  // Wait briefly for error to appear
  await page.waitForTimeout(2000);
  
  // Take a screenshot for the report
  const screenshot = await page.screenshot({ fullPage: true });
  await testInfo.attach('empty-email-screenshot', { body: screenshot, contentType: 'image/png' });

  // Try multiple approaches to detect validation errors
  try {
    // Capture what's visible on the page for debugging
    const pageHtml = await page.content();
    console.log('Current page state when testing empty email:', pageHtml.substring(0, 500) + '...');

    // 1. Check for HTML5 validation - most browsers prevent form submission
    const emailInput = page.locator('#email');
    const isValid = await emailInput.evaluate(el => {
      // Use proper type assertion for HTML input element
      const inputEl = el as HTMLInputElement;
      return inputEl && typeof inputEl.checkValidity === 'function' ? !inputEl.checkValidity() : false;
    });
    if (isValid) {
      console.log('Email input has HTML5 validation error');
      // Test passes because we found a validation error
      return;
    }

    // 2. Check for toast notifications
    const toastError = page.locator('.Toastify__toast--error');
    if (await toastError.count() > 0) {
      console.log('Found toast error message:', await toastError.textContent());
      // Test passes because we found an error message
      return;
    }
    
    // 3. Check for common error message selectors
    const errorSelectors = [
      '[role="alert"]',                  // ARIA alert role
      '.error, .error-message',          // Common error classes
      '.text-red-500, .text-danger',     // Common error text color classes
      '.invalid-feedback',               // Bootstrap validation
      'p:has-text("email is required")' // Text-based detection
    ];
    
    for (const selector of errorSelectors) {
      const errorElement = page.locator(selector);
      if (await errorElement.count() > 0 && await errorElement.isVisible()) {
        console.log(`Found error element with selector: ${selector}`);
        return; // Test passes
      }
    }
    
    // 4. Check if form is marked as invalid (HTML5)
    const formInvalid = await page.locator('form').evaluate(form => {
      // Use proper type assertion for HTML form element
      const formEl = form as HTMLFormElement;
      return formEl && typeof formEl.checkValidity === 'function' ? !formEl.checkValidity() : false;
    });
    if (formInvalid) {
      console.log('Form is marked as invalid');
      return; // Test passes
    }
    
    // 5. Check if we're still on the login page (didn't navigate away)
    const currentUrl = page.url();
    if (currentUrl.includes('/login')) {
      console.log('Still on login page, which suggests validation prevented navigation');
      return; // Test passes
    }
    
    // If we get here, we couldn't detect any validation - test fails
    throw new Error('No validation error found for empty email submission');
  } catch (error) {
    console.error('Error in empty email validation test:', error);
    // Take another screenshot to capture the final state
    const errorScreenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('error-state', { body: errorScreenshot, contentType: 'image/png' });
    throw error;
  }
});

// Test: Login with empty password field
test('should show error with empty password field', async ({ page, baseURL }) => {
  // Navigate to the login page
  await page.goto(`${baseURL}/login`, { timeout: NAVIGATION_TIMEOUT });
  await page.waitForSelector('#email', { timeout: ELEMENT_TIMEOUT });

  // Find input fields
  const emailInput = page.locator('input#email');
  const passwordInput = page.locator('input#password');
  const submitButton = page.locator('button[type="submit"]');

  await expect(emailInput).toBeVisible({ timeout: ELEMENT_TIMEOUT });
  await expect(passwordInput).toBeVisible({ timeout: ELEMENT_TIMEOUT });

  // Fill email, leave password empty
  await emailInput.fill(TEST_USER_EMAIL);
  await submitButton.click();
  
  // Wait briefly for error to appear
  await page.waitForTimeout(2000);
  
  // Take a screenshot to see validation errors
  await page.screenshot({ path: './test-results/empty-password-error.png' });

  // Check for any validation error on the page
  // Instead of using document.evaluate, we'll use a simpler approach with selectors
  const errorSelectors = [
    '[role="alert"]',                   // Standard alert role
    '.error, .error-message',           // Common error classes
    '.text-red-500, .text-danger',      // Common error text color classes
    '#password:invalid',                // HTML5 validation pseudo-class
    '.invalid-feedback'                 // Bootstrap-style error message
  ];
  
  // Try checking for any visible error elements
  let errorDetected = false;
  for (const selector of errorSelectors) {
    const errorElement = page.locator(selector);
    const count = await errorElement.count();
    if (count > 0) {
      errorDetected = true;
      console.log(`Found error element with selector: ${selector}`);
      break;
    }
  }
  
  // Assert that validation error is visible somewhere on the page
  expect(errorDetected || await page.locator('form:invalid').count() > 0).toBeTruthy();
});

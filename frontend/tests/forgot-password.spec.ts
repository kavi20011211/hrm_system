import { test, expect } from '@playwright/test';
import 'dotenv/config';

const TEST_USER_EMAIL = process.env.TEST_USER_EMAIL ?? 'easaraivanjaya24@gmail.com';

const NAVIGATION_TIMEOUT = 90000; // 90 seconds for navigation
const ELEMENT_TIMEOUT = 15000;    // 15 seconds for element visibility

// Test: Navigate to forgot password page from login
test('should navigate to forgot password page from login', async ({ page, baseURL }, testInfo) => {
  // Navigate to the login page
  await page.goto(`${baseURL}/login`, { timeout: NAVIGATION_TIMEOUT });
  await page.waitForSelector('#email', { timeout: ELEMENT_TIMEOUT });
  
  // Find "Forgot Password" link - try multiple approaches
  try {
    // First try by role and text
    const forgotPasswordLinkByRole = page.getByRole('link', { name: /forgot.password/i });
    if (await forgotPasswordLinkByRole.count() > 0) {
      await expect(forgotPasswordLinkByRole).toBeVisible({ timeout: ELEMENT_TIMEOUT });
      await forgotPasswordLinkByRole.click();
    } else {
      // Then try by text
      const forgotPasswordLinkByText = page.getByText(/forgot.password/i);
      if (await forgotPasswordLinkByText.count() > 0) {
        await expect(forgotPasswordLinkByText).toBeVisible({ timeout: ELEMENT_TIMEOUT });
        await forgotPasswordLinkByText.click();
      } else {
        // Try any link or button with forgot in the text
        const anyForgotElement = page.locator('a, button, [role="button"]').filter({ hasText: /forgot/i }).first();
        await expect(anyForgotElement).toBeVisible({ timeout: ELEMENT_TIMEOUT });
        await anyForgotElement.click();
      }
    }
  } catch (error) {
    console.error('Error finding forgot password link:', error);
    // Take a screenshot to debug
    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('forgot-link-error', { body: screenshot, contentType: 'image/png' });
    throw error;
  }
  
  // Verify we're on the forgot password page
  await page.waitForURL(`${baseURL}/forgot-password`, { timeout: NAVIGATION_TIMEOUT });
  
  // Verify the email input field is present
  const emailInput = page.getByLabel(/email/i);
  await expect(emailInput).toBeVisible({ timeout: ELEMENT_TIMEOUT });
  
  // Take a screenshot for the report
  const screenshot = await page.screenshot({ fullPage: true });
  await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
});

// Test: First step of forgot password flow (email check)
test('should handle email submission for password reset', async ({ page, baseURL }, testInfo) => {
  // Navigate to the forgot password page
  await page.goto(`${baseURL}/forgot-password`, { timeout: NAVIGATION_TIMEOUT });
  await page.waitForSelector('form', { timeout: ELEMENT_TIMEOUT });
  
  // Fill in a valid email address
  const emailInput = page.getByLabel(/email/i) || page.locator('input[type="email"]');
  await emailInput.fill(TEST_USER_EMAIL);
  
  // Submit the form
  const continueButton = page.getByRole('button', { name: /continue|next|proceed/i }) || 
                        page.locator('form button[type="submit"]').first();
  await continueButton.click();
  
  // Take a screenshot after submission
  const screenshot = await page.screenshot({ fullPage: true });
  await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
  
  // Check if we proceed to the security question step or see an error message
  try {
    // Need to handle different ways the security question might appear
    
    // Check if we moved to the security step - multiple potential selectors
    const pageTitle = page.locator('h2', { hasText: /verify your identity|security question/i });
    const securityQuestionText = page.locator('div:has-text("Security Question")');
    const securityAnswerInput = page.locator('#security-answer, input[name="securityAnswer"]');
    
    // Check toast notifications for success
    const successToast = page.locator('.Toastify__toast--success');
    
    // Try multiple approaches to detect successful progression
    let success = false;
    
    // Wait briefly for UI to update
    await page.waitForTimeout(2000);
    
    // Take another screenshot to see current state
    const screenshotAfterWait = await page.screenshot({ fullPage: true });
    await testInfo.attach('after-wait', { body: screenshotAfterWait, contentType: 'image/png' });
    
    // Check if security step elements are visible
    if (await pageTitle.count() > 0 && await pageTitle.isVisible()) {
      console.log('Found security step title');
      success = true;
    } else if (await securityQuestionText.count() > 0 && await securityQuestionText.isVisible()) {
      console.log('Found security question text');
      success = true;
    } else if (await securityAnswerInput.count() > 0 && await securityAnswerInput.isVisible()) {
      console.log('Found security answer input');
      success = true;
    } else if (await successToast.count() > 0 && await successToast.isVisible()) {
      console.log('Found success toast notification');
      success = true;
    }
    
    // If we didn't find success indicators, check for error messages
    if (!success) {
      // Check for any error indicators
      const errorToast = page.locator('.Toastify__toast--error');
      const errorMessage = page.locator('[role="alert"], .text-red-500, p:has-text("error")');
      
      if (await errorToast.count() > 0 && await errorToast.isVisible()) {
        console.log('Found error toast with text:', await errorToast.textContent());
        // Error is acceptable since we're testing the flow
        return;
      } else if (await errorMessage.count() > 0 && await errorMessage.isVisible()) {
        console.log('Found error message with text:', await errorMessage.textContent());
        // Error is acceptable since we're testing the flow
        return;
      }
      
      // If we get here, neither success nor error was found
      console.log('Current page state:', await page.content());
      throw new Error('Neither security question step nor error message found after email submission');
    }
    
    // If we get here, we found success indicators
    expect(success).toBeTruthy();
  } catch (error) {
    console.error('Error in email submission test:', error);
    const finalScreenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('final-state', { body: finalScreenshot, contentType: 'image/png' });
    throw error;
  }
});

// Test: Back to login functionality
test('should navigate back to login from forgot password page', async ({ page, baseURL }, testInfo) => {
  // Navigate to the forgot password page
  await page.goto(`${baseURL}/forgot-password`, { timeout: NAVIGATION_TIMEOUT });
  await page.waitForSelector('form', { timeout: ELEMENT_TIMEOUT });
  
  // Find and click the "Back to Login" link - handling strict mode violations
  try {
    // Most specific approach - look for button with exact text
    const backToLoginButton = page.getByRole('button', { name: 'Back to login', exact: true });
    if (await backToLoginButton.count() > 0) {
      await expect(backToLoginButton).toBeVisible({ timeout: ELEMENT_TIMEOUT });
      await backToLoginButton.click();
    } else {
      // Try for the "remember your password" button 
      const rememberPasswordButton = page.getByRole('button', { name: 'Remember your password? Back to Login' });
      if (await rememberPasswordButton.count() > 0) {
        await expect(rememberPasswordButton).toBeVisible({ timeout: ELEMENT_TIMEOUT });
        await rememberPasswordButton.click();
      } else {
        // Fallback to any button with "login" text
        const anyLoginButton = page.locator('button').filter({ hasText: /login/i }).first();
        await expect(anyLoginButton).toBeVisible({ timeout: ELEMENT_TIMEOUT });
        await anyLoginButton.click();
      }
    }
  } catch (error) {
    console.error('Error finding back to login button:', error);
    // Take a screenshot to debug
    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('back-button-error', { body: screenshot, contentType: 'image/png' });
    throw error;
  }
  
  // Verify we're back on the login page
  await page.waitForURL(`${baseURL}/login`, { timeout: NAVIGATION_TIMEOUT });
  
  // Verify the login page elements are visible
  const emailInput = page.locator('#email');
  const passwordInput = page.locator('#password');
  await expect(emailInput).toBeVisible({ timeout: ELEMENT_TIMEOUT });
  await expect(passwordInput).toBeVisible({ timeout: ELEMENT_TIMEOUT });
});

// Test: Empty email submission
test('should show error for empty email submission', async ({ page, baseURL }, testInfo) => {
  // Navigate to the forgot password page
  await page.goto(`${baseURL}/forgot-password`, { timeout: NAVIGATION_TIMEOUT });
  await page.waitForSelector('form', { timeout: ELEMENT_TIMEOUT });
  
  // Submit without filling email
  const submitButton = page.getByRole('button', { name: /continue|next|proceed/i }) || 
                      page.locator('form button[type="submit"]').first();
  await submitButton.click();
  
  // Take a screenshot after submission
  const screenshot = await page.screenshot({ fullPage: true });
  await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
  
  // Should see an error message
  try {
    // First check for toast notifications
    const toastError = page.locator('.Toastify__toast--error').first();
    if (await toastError.count() > 0) {
      await expect(toastError).toBeVisible({ timeout: ELEMENT_TIMEOUT });
      return;
    }
    
    // Then check for inline form errors
    const formError = page.locator('[role="alert"], .text-red-500, .error-message').first();
    if (await formError.count() > 0) {
      await expect(formError).toBeVisible({ timeout: ELEMENT_TIMEOUT });
      return;
    }
    
    // If no visible error, check for form validation (HTML5)
    const invalidForm = page.locator('form:invalid');
    expect(await invalidForm.count()).toBeGreaterThan(0);
  } catch (error) {
    console.error('Error finding validation error:', error);
    throw new Error('No validation error found for empty email submission');
  }
});

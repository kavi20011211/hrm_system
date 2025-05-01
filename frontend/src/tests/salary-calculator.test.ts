import { test, expect } from '@playwright/test';

// Test suite for Salary Calculator
test.describe('Salary Calculator', () => {
  // Before each test, navigate to the salary calculator page
  test.beforeEach(async ({ page }) => {
    // Login first (adjust as needed for your auth system)
    await page.goto('/login');
    await page.fill('input[placeholder="Enter your email"]', 'admin@example.com');
    await page.fill('input[placeholder="••••••••"]', 'password123');
    await page.click('button:has-text("Sign in")');
    
    // Navigate to salary calculator page
    await page.goto('/salary-calculator');
    // Wait for the calculator to be visible
    await page.waitForSelector('text=Salary Calculator');
  });

  test('should display the calculator interface correctly', async ({ page }) => {
    // Verify main sections are visible
    await expect(page.locator('text=Salary Information')).toBeVisible();
    await expect(page.locator('text=Contribution Rates')).toBeVisible();
    await expect(page.locator('text=Tax Brackets')).toBeVisible();
    
    // Verify default values are set correctly
    await expect(page.locator('input[placeholder="Enter your monthly gross salary"]')).toHaveValue('0');
    await expect(page.locator('input[placeholder="Default: 8%"]')).toHaveValue('8');
    await expect(page.locator('input[placeholder="Default: 12%"]')).toHaveValue('12');
  });

  test('should calculate salary correctly for 100,000 LKR (no tax scenario)', async ({ page }) => {
    // Input salary amount
    await page.fill('input[placeholder="Enter your monthly gross salary"]', '100000');
    
    // Click calculate button
    await page.click('button:has-text("Calculate Salary")');
    
    // Assert results appear
    await expect(page.locator('text=Salary Calculation Results')).toBeVisible();
    
    // Check expected calculations
    const epfDeduction = 100000 * 0.08; // 8% of 100,000
    const taxAmount = 0; // No tax on first 100,000
    const netSalary = 100000 - epfDeduction - taxAmount;
    
    // Verify results displayed match expectations (using partial text matching)
    await expect(page.locator(`text=EPF Deduction (8%):`)).toContainText(`${epfDeduction.toFixed(2)}`);
    await expect(page.locator(`text=Income Tax:`)).toContainText(`${taxAmount.toFixed(2)}`);
    await expect(page.locator(`text=Net Salary:`)).toContainText(`${netSalary.toFixed(2)}`);
  });

  test('should calculate salary correctly for 500,000 LKR (multiple tax brackets)', async ({ page }) => {
    // Input salary amount
    await page.fill('input[placeholder="Enter your monthly gross salary"]', '500000');
    
    // Click calculate button
    await page.click('button:has-text("Calculate Salary")');
    
    // Calculate expected results
    const epfDeduction = 500000 * 0.08; // 8% of 500,000 = 40,000
    
    // Tax calculation based on brackets
    const firstBracketTax = 0; // 0% on first 100,000
    const secondBracketTax = 200000 * 0.10; // 10% on 100,001-300,000 = 20,000
    const thirdBracketTax = 200000 * 0.15; // 15% on 300,001-500,000 = 30,000
    const totalTax = firstBracketTax + secondBracketTax + thirdBracketTax; // 50,000
    
    const netSalary = 500000 - epfDeduction - totalTax; // 500,000 - 40,000 - 50,000 = 410,000
    
    // Verify results displayed match expectations
    await expect(page.locator(`text=EPF Deduction (8%):`)).toContainText(`${epfDeduction.toFixed(2)}`);
    await expect(page.locator(`text=Income Tax:`)).toContainText(`${totalTax.toFixed(2)}`);
    await expect(page.locator(`text=Net Salary:`)).toContainText(`${netSalary.toFixed(2)}`);
  });

  test('should allow custom tax rates', async ({ page }) => {
    // Toggle custom tax rates
    await page.click('text=Custom Tax Rates');
    
    // Set custom rates
    await page.fill('input[placeholder="First Bracket: 0 - 100,000 (%)"]', '5');
    await page.fill('input[placeholder="Second Bracket: 100,001 - 300,000 (%)"]', '12');
    await page.fill('input[placeholder="Third Bracket: 300,001 - 800,000 (%)"]', '18');
    await page.fill('input[placeholder="Fourth Bracket: Above 800,000 (%)"]', '25');
    
    // Input salary amount
    await page.fill('input[placeholder="Enter your monthly gross salary"]', '400000');
    
    // Click calculate button
    await page.click('button:has-text("Calculate Salary")');
    
    // Calculate expected results with custom rates
    const epfDeduction = 400000 * 0.08; // 8% of 400,000 = 32,000
    
    // Tax calculation based on custom brackets
    const firstBracketTax = 100000 * 0.05; // 5% on first 100,000 = 5,000
    const secondBracketTax = 200000 * 0.12; // 12% on 100,001-300,000 = 24,000
    const thirdBracketTax = 100000 * 0.18; // 18% on 300,001-400,000 = 18,000
    const totalTax = firstBracketTax + secondBracketTax + thirdBracketTax; // 47,000
    
    const netSalary = 400000 - epfDeduction - totalTax; // 400,000 - 32,000 - 47,000 = 321,000
    
    // Verify results displayed match our custom tax rate calculations
    await expect(page.locator(`text=Income Tax:`)).toContainText(`${totalTax.toFixed(2)}`);
  });

  test('should update EPF and ETF rates correctly', async ({ page }) => {
    // Modify EPF and ETF rates
    await page.fill('input[placeholder="Default: 8%"]', '10');
    await page.fill('input[placeholder="Default: 12%"]', '15');
    
    // Input salary amount
    await page.fill('input[placeholder="Enter your monthly gross salary"]', '200000');
    
    // Click calculate button
    await page.click('button:has-text("Calculate Salary")');
    
    // Calculate expected results with custom rates
    const epfDeduction = 200000 * 0.10; // 10% of 200,000 = 20,000
    const etfContribution = 200000 * 0.15; // 15% of 200,000 = 30,000
    
    // Tax calculation based on brackets
    const firstBracketTax = 0; // 0% on first 100,000
    const secondBracketTax = 100000 * 0.10; // 10% on 100,001-200,000 = 10,000
    const totalTax = firstBracketTax + secondBracketTax; // 10,000
    
    const netSalary = 200000 - epfDeduction - totalTax; // 200,000 - 20,000 - 10,000 = 170,000
    
    // Verify results displayed match expectations
    await expect(page.locator(`text=EPF Deduction (10%):`)).toContainText(`${epfDeduction.toFixed(2)}`);
    await expect(page.locator(`text=Employer ETF Contribution (15%):`)).toContainText(`${etfContribution.toFixed(2)}`);
    await expect(page.locator(`text=Net Salary:`)).toContainText(`${netSalary.toFixed(2)}`);
  });
});

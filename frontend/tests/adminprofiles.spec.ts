import { test, expect } from "@playwright/test";

test.describe("Admin profile validations", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("http://localhost:5173/login");
        await expect(page.locator('input[name="email"]')).toBeVisible();
        await page
          .locator('input[name="email"]')
          .fill("easaraivanjaya24@gmail.com");
        await page.locator('input[name="password"]').fill("Test123");
        await page.locator('button[type="submit"]:has-text("Sign in")').click();
        await page.waitForURL("http://localhost:5173/");
        expect(page.url()).toBe("http://localhost:5173/");
      });

      //Login Validation

      test("Email and Password validation", async ({ page }) => {
        // Navigate directly to job post page after login
        await page.goto("http://localhost:5173/admin-user");
    
        // Wait for job post form to appear
        await page.waitForSelector("form");

        //Fill the forum
            await page.locator('input[name="email"]').fill("kavishkauvindu0@gmail.com");
            await page.locator('input[name="password"]').fill("Uvindu@123");

            // Submit the form
            await page.locator('button[type="submit"]:has-text("Login")').click();

            // Wait for the success toast
            await expect(page.locator(".Toastify__toast--success")).toBeVisible({
            timeout: 5000,
            });
            await expect(page.locator(".Toastify__toast--success")).toContainText(
            "Logged in successfully!"
            );
        });
      });

      test("Should show an error in email field when entring incorrect format", async ({ page }) => {
        // Navigate directly to job post page after login
        await page.goto("http://localhost:5173/register");
    
        // Wait for job post form to appear
        await page.waitForSelector("form");
      });
      
    //   test("Confirm Password should be same as the password", async ({ page }) => {
    //     // Navigate directly to job post page after login
    //     await page.goto("http://localhost:5173/register");
    
    //     // Wait for job post form to appear
    //     await page.waitForSelector("form");
    //   });

    //   test("Should data Updated Successfully", async ({ page }) => {
    //     // Navigate directly to job post page after login
    //     await page.goto("http://localhost:5173/register");
    
    //     // Wait for job post form to appear
    //     await page.waitForSelector("form");
    //   });

    //   test("Should Logout Successfully", async ({ page }) => {
    //     // Navigate directly to job post page after login
    //     await page.goto("http://localhost:5173/register");
    
    //     // Wait for job post form to appear
    //     await page.waitForSelector("form");
    //   });
    
  
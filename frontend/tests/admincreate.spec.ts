import { test, expect } from "@playwright/test";

test.describe("Admin create validations", () => {
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

  test("should create an admin successfully", async ({ page }) => {
    // Navigate directly to job post page after login
    await page.goto("http://localhost:5173/register");

    // Wait for job post form to appear
    await page.waitForSelector("form");
  });

  test("should show an error for empty fields ", async ({ page }) => {});

  test("should show an error for a mismatched passwords", async ({
    page,
  }) => {});

  test("should show an error for weak password", async ({ page }) => {});
});

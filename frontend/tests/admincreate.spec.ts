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

    // Check if redirected back to login
    if (page.url().includes("login")) {
      throw new Error(
        "Login session was not preserved; redirected back to login."
      );
    }

    // Wait for job id input to appear
    await expect(page.locator('input[name="firstName"]')).toBeVisible({
      timeout: 10000,
    });

    // Fill the job post fields
    await page.locator('input[name="firstName"]').fill("Isini");
    await page.locator('input[name="lastName"]').fill("Shavindya");
    await page.locator('input[name="email"]').fill("isinishavi@gmail.com");
    await page.locator('input[name="contact"]').fill("0783476532");
    await page.locator('input[name="nic"]').fill("200134213487");
    await page.locator('input[name="password"]').fill("Isini@Hello1234");
    await page
      .locator('input[name="confirm_password"]')
      .fill("Isini@Hello1234");

    // Submit the form
    await page.locator('button[type="submit"]:has-text("Submit")').click();

    // Wait for the success toast
    await expect(page.locator(".Toastify__toast--success")).toBeVisible({
      timeout: 5000,
    });
    await expect(page.locator(".Toastify__toast--success")).toContainText(
      "Admin created successfully!"
    );
  });

  test("should show an error for empty fields ", async ({ page }) => {
    await page.goto("http://localhost:5173/register");

    // Fill the job post fields
    await page.locator('input[name="firstName"]').fill("Chenura");
    await page.locator('input[name="lastName"]').fill("De Silva");
    await page.locator('input[name="email"]').fill("chenu58hello@gmail.com");
    await page.locator('input[name="contact"]').fill("0783476532");
    await page.locator('input[name="nic"]').fill(" ");
    await page.locator('input[name="password"]').fill("Chenu@Hello1234");
    await page
      .locator('input[name="confirm_password"]')
      .fill("Chenu@Hello1234");

    // Submit the form
    await page.locator('button[type="submit"]:has-text("Submit")').click();

    await expect(
      page.getByText("Admin user valied NIC is required")
    ).toBeVisible();
  });

  test("should show an error for a mismatched passwords", async ({ page }) => {
    await page.goto("http://localhost:5173/register");

    // Fill the job post fields
    await page.locator('input[name="firstName"]').fill("Hirusha");
    await page.locator('input[name="lastName"]').fill("Sasanka");
    await page.locator('input[name="email"]').fill("hirusha58hello@gmail.com");
    await page.locator('input[name="contact"]').fill("0783476532");
    await page.locator('input[name="nic"]').fill(" 200135603256 ");
    await page.locator('input[name="password"]').fill("Hirusha@Hello1234");
    await page
      .locator('input[name="confirm_password"]')
      .fill("Chenu@Hello1234");

    // Submit the form
    await page.locator('button[type="submit"]:has-text("Submit")').click();

    await page
      .locator(".Toastify__toast--error")
      .waitFor({ state: "visible", timeout: 6000 });
    await expect(page.locator(".Toastify__toast--error")).toContainText(
      "Passwords are mismatched!"
    );
  });

  test("should show an error for weak password", async ({ page }) => {
    await page.goto("http://localhost:5173/register");

    // Fill the job post fields
    await page.locator('input[name="firstName"]').fill("Uvindu");
    await page.locator('input[name="lastName"]').fill("Kavishka");
    await page.locator('input[name="email"]').fill("uvindu58hello@gmail.com");
    await page.locator('input[name="contact"]').fill("0783476534");
    await page.locator('input[name="nic"]').fill(" 200135603766 ");
    await page.locator('input[name="password"]').fill("uvi");
    await page.locator('input[name="confirm_password"]').fill("uvi");

    // Submit the form
    await page.locator('button[type="submit"]:has-text("Submit")').click();

    await expect(
      page.getByText("Password must be at least 8 characters long")
    ).toBeVisible();
  });
});

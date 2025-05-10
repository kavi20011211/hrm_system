import { test, expect } from "@playwright/test";

test.describe("Admin Profile Validations", () => {
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

  test("Email and Password validation", async ({ page }) => {
    await page.goto("http://localhost:5173/admin-user");

    await page.waitForSelector("form");

    await page.locator('input[name="email"]').fill("kavishkauvindu0@gmail.com");
    await page.locator('input[name="password"]').fill("Uvindu@123");

    await page.locator('button[type="submit"]:has-text("Login")').click();

    const toast = page.locator(".Toastify__toast--success");
    await expect(toast).toBeVisible({ timeout: 5000 });
    await expect(toast).toContainText("Logged in successfully!");
  });

  test("Should show error for invalid email format in profile edit", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173/admin-profile");

    // await page.waitForSelector("form");

    if (page.url().includes("login")) {
      throw new Error(
        "Login session was not preserved; redirected back to login."
      );
    }

    await page
      .locator('button[type="button"]:has-text("Edit profile")')
      .click();
    // await page.waitForSelector("form");

    await page.locator('input[name="email"]').fill("kavishkauvindu0@.com");

    await page.locator('button[type="submit"]:has-text("Save")').click();

    const warningToast = page.locator(".Toastify__toast--warning");
    await expect(warningToast).toBeVisible({ timeout: 5000 });
    await expect(warningToast).toContainText(
      "Please enter a valid email address."
    );
  });

  test("Confirm password should match the password", async ({ page }) => {
    await page.goto("http://localhost:5173/admin-profile");

    // await page.waitForSelector("form");

    if (page.url().includes("login")) {
      throw new Error(
        "Login session was not preserved; redirected back to login."
      );
    }

    await page
      .locator('button[type="button"]:has-text("Edit profile")')
      .click();

    await page.locator('input[name="password"]').fill("Uvindu@1234");
    await page.locator('input[name="confirmPassword"]').fill("Uvindu@123");

    await expect(page.getByText("Passwords do not match")).toBeVisible();
  });

  test("Should update data successfully", async ({ page }) => {
    await page.goto("http://localhost:5173/admin-profile");

    if (page.url().includes("login")) {
      throw new Error(
        "Login session was not preserved; redirected back to login."
      );
    }

    await page
      .locator('button[type="button"]:has-text("Edit profile")')
      .click();

    await page.locator('input[name="password"]').fill("Uvindu@123");
    await page.locator('input[name="confirmPassword"]').fill("Uvindu@123");

    await page.locator('button[type="submit"]:has-text("Save")').click();

    const toast = page.locator(".Toastify__toast--success");
    await expect(toast).toBeVisible({ timeout: 5000 });
    await expect(toast).toContainText("Profile updated successfully!");
  });

  test("Should logout successfully", async ({ page }) => {
    // Placeholder for future test implementation

    await page.goto("http://localhost:5173/admin-profile");

    await page.locator('button[type="submit"]:has-text("Logout")').click();

    if (page.url().includes("admin-user")) {
      const toast = page.locator(".Toastify__toast--success");
      await expect(toast).toBeVisible({ timeout: 5000 });
      await expect(toast).toContainText("Logged Out successfully!");
    }
  });
});

import { test, expect } from "@playwright/test";

test.describe("Employee Form Validation", () => {
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

  test("should create employee successfully", async ({ page }) => {
    await page.goto("http://localhost:5173/employee");

    await page.locator('input[name="id"]').fill("EMP001");
    await page.locator('input[name="name"]').fill("John Doe");
    await page.locator('input[name="email"]').fill("john@example.com");
    await page.locator('input[name="category"]').fill("HR");

    await page.locator('button[type="submit"]').click();

    await expect(page.locator(".Toastify__toast--success")).toBeVisible();
    await expect(page.locator(".Toastify__toast--success")).toContainText(
      "Employee added successfully"
    );
  });

  test("should show error for empty ID", async ({ page }) => {
    await page.goto("http://localhost:5173/employee");

    await page.locator('input[name="name"]').fill("John Doe");
    await page.locator('input[name="email"]').fill("john@example.com");
    await page.locator('input[name="category"]').fill("HR");

    await page.locator('button[type="submit"]').click();

    await expect(page.locator(".Toastify__toast--error")).toContainText(
      "ID is required"
    );
  });

  test("should show error for invalid email", async ({ page }) => {
    await page.goto("http://localhost:5173/employee");

    await page.locator('input[name="id"]').fill("EMP002");
    await page.locator('input[name="name"]').fill("Jane Doe");
    await page.locator('input[name="email"]').fill("invalid-email");
    await page.locator('input[name="category"]').fill("Finance");

    await page.locator('button[type="submit"]').click();

    await expect(page.locator(".Toastify__toast--error")).toContainText(
      "Invalid email"
    );
  });

  test("should show error for empty name", async ({ page }) => {
    await page.goto("http://localhost:5173/employee");

    await page.locator('input[name="id"]').fill("EMP003");
    await page.locator('input[name="email"]').fill("jane@example.com");
    await page.locator('input[name="category"]').fill("Finance");

    await page.locator('button[type="submit"]').click();

    await expect(page.locator(".Toastify__toast--error")).toContainText(
      "Name is required"
    );
  });

  test("should show error for empty email", async ({ page }) => {
    await page.goto("http://localhost:5173/employee");

    await page.locator('input[name="id"]').fill("EMP004");
    await page.locator('input[name="name"]').fill("Alex");
    await page.locator('input[name="category"]').fill("IT");

    await page.locator('button[type="submit"]').click();

    await expect(page.locator(".Toastify__toast--error")).toContainText(
      "Email is required"
    );
  });

  test("should show error for empty category", async ({ page }) => {
    await page.goto("http://localhost:5173/employee");

    await page.locator('input[name="id"]').fill("EMP005");
    await page.locator('input[name="name"]').fill("Sam");
    await page.locator('input[name="email"]').fill("sam@example.com");

    await page.locator('button[type="submit"]').click();

    await expect(page.locator(".Toastify__toast--error")).toContainText(
      "Category is required"
    );
  });

  test("should show error for duplicate ID", async ({ page }) => {
    await page.goto("http://localhost:5173/employee-form"); 

    await page.locator('input[name="id"]').fill("EMP001");
    await page.locator('input[name="name"]').fill("Test Duplicate");
    await page.locator('input[name="email"]').fill("duplicate@test.com");
    await page.locator('input[name="category"]').fill("Engineering");

    await page.getByRole("button", { name: "Add" }).click();

    const errorToast = page.locator(".Toastify__toast--error");
    await expect(errorToast).toHaveText("Employee ID already exists", {
      timeout: 10000,
    });
  });

  test("should allow only alphanumeric ID", async ({ page }) => {
    await page.goto("http://localhost:5173/employee");

    await page.locator('input[name="id"]').fill("EMP@@@");
    await page.locator('input[name="name"]').fill("Tom");
    await page.locator('input[name="email"]').fill("tom@example.com");
    await page.locator('input[name="category"]').fill("Admin");

    await page.locator('button[type="submit"]').click();

    await expect(page.locator(".Toastify__toast--error")).toContainText(
      "ID must be alphanumeric"
    );
  });

  test("should not allow email longer than 50 characters", async ({ page }) => {
    await page.goto("http://localhost:5173/employee");

    await page.locator('input[name="id"]').fill("EMP010");
    await page.locator('input[name="name"]').fill("Peter");
    await page
      .locator('input[name="email"]')
      .fill("averyverylongemailaddressmorethanfiftycharacters@example.com");
    await page.locator('input[name="category"]').fill("Design");

    await page.locator('button[type="submit"]').click();

    await expect(page.locator(".Toastify__toast--error")).toContainText(
      "Email must be at most 50 characters"
    );
  });

  test("should trim whitespace inputs before submit", async ({ page }) => {
    await page.goto("http://localhost:5173/employee-form");

    await page.locator('input[name="id"]').fill("  EMP999  ");
    await page.locator('input[name="name"]').fill("  Trimmed User  ");
    await page.locator('input[name="email"]').fill("  trimmed@example.com  ");
    await page.locator('input[name="category"]').fill("  HR  ");

    await page.getByRole("button", { name: "Add" }).click();

    const successToast = page.locator(".Toastify__toast--success");
    await expect(successToast).toHaveText("Employee added successfully!", {
      timeout: 10000,
    });
  });
});

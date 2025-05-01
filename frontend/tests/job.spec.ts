import { test, expect } from "@playwright/test";

test.describe("Job Posting Validation", () => {
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

  test("should create job successfully", async ({ page }) => {
    // Navigate directly to job post page after login
    await page.goto("http://localhost:5173/job-post");

    // Wait for job post form to appear
    await page.waitForSelector("form");

    // Check if redirected back to login
    if (page.url().includes("login")) {
      throw new Error(
        "Login session was not preserved; redirected back to login."
      );
    }

    // Wait for job id input to appear
    await expect(page.locator('input[name="id"]')).toBeVisible({
      timeout: 10000,
    });

    // Fill the job post fields
    await page.locator('input[name="id"]').fill("PM0002");
    await page.locator('input[name="title"]').fill("Project Manager");
    await page
      .locator('textarea[name="description"]')
      .fill("This is a project manager position.");

    // Submit the form
    await page.locator('button[type="submit"]:has-text("Submit")').click();

    // Wait for the success toast
    await expect(page.locator(".Toastify__toast--success")).toBeVisible({
      timeout: 5000,
    });
    await expect(page.locator(".Toastify__toast--success")).toContainText(
      "Job created successfully"
    );
  });

  test("should show error for Job ID exceeding 10 characters", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173/job-post");

    await page.locator('input[name="id"]').fill("SE0000000000000000");
    await page.locator('input[name="title"]').fill("Project Manager");
    await page
      .locator('textarea[name="description"]')
      .fill("This is a project manager position.");

    await page.locator('button[type="submit"]:has-text("Submit")').click();

    await expect(
      page.getByText("Job ID must be at most 10 characters")
    ).toBeVisible();
  });

  test("should show error for Job Title exceeding 30 characters", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173/job-post");

    await page.locator('input[name="id"]').fill("PM0002");
    await page
      .locator('input[name="title"]')
      .fill("Project Manager Intern Position in LSEG Colombo");
    await page
      .locator('textarea[name="description"]')
      .fill("This is a project manager position.");

    await page.locator('button[type="submit"]:has-text("Submit")').click();

    await expect(
      page.getByText("Job title must be at most 30 characters")
    ).toBeVisible();
  });
});

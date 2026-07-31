import { test, expect } from "@playwright/test";

test.describe("Clipper Login Happy Path", () => {
  const BASE_URL = "https://sandbox.konten.com";
  const VALID_EMAIL = "sandbox1@dev.konten.com";
  const VALID_PASSWORD = "SandBoxPass321@";

  test("log in as a Clipper and view dashboard", async ({ page }) => {
    // 1. Navigate to Login Page
    await page.goto(`${BASE_URL}/login`);
    await expect(page).toHaveTitle(/Konten.com/i);

    // 2. Fill credentials
    const emailInput = page.locator('input[name="email"]');
    const passwordInput = page.locator('input[name="password"]');
    const submitButton = page.locator('button[type="submit"]');

    await expect(emailInput).toBeVisible();
    await emailInput.fill(VALID_EMAIL);
    await passwordInput.fill(VALID_PASSWORD);

    // 3. Submit Form
    await submitButton.click();

    // 4. Verify successful redirection and UI states
    await expect(page).toHaveURL(`${BASE_URL}/clipper-dashboard`);

    // Check elements on Dashboard
    await expect(
      page.getByRole("banner").getByRole("link", { name: "Dashboard" }),
    ).toBeVisible();
  });
});

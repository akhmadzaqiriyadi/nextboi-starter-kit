import { expect, test } from "@playwright/test";

test.describe("Authentication E2E Flow", () => {
  test.beforeEach(async ({ page }) => {
    page.on("request", (req) => {
      console.log(`[REQUEST] ${req.method()} ${req.url()}`);
    });
    page.on("response", (res) => {
      console.log(`[RESPONSE] ${res.status()} ${res.url()}`);
    });
  });

  test("should redirect unauthenticated guest users trying to access dashboard", async ({
    page,
  }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/.*\/login/);
    await expect(page.locator("text=Selamat Datang Kembali")).toBeVisible();
  });

  test("should successfully login, access dashboard, and logout", async ({
    page,
  }) => {
    await page.goto("/login");
    // Wait for the initial session check to finish (ensures hydration)
    await page.waitForResponse("**/api-proxy/auth/refresh");

    const emailInput = page.locator("input#email");
    const passwordInput = page.locator("input#password");
    const submitBtn = page.getByRole("button", { name: "Masuk", exact: true });

    // 1. Submit incorrect credentials
    let responsePromise = page.waitForResponse("**/api-proxy/auth/login");
    await emailInput.fill("invalid-user@example.com");
    await passwordInput.fill("wrongpassword");
    await submitBtn.click();
    await responsePromise;
    await expect(page.locator("text=Email atau password salah")).toBeVisible();

    // 2. Submit correct credentials
    responsePromise = page.waitForResponse("**/api-proxy/auth/login");
    await emailInput.fill("user@example.com");
    await passwordInput.fill("password123");
    await submitBtn.click();
    await responsePromise;

    // Should be redirected to /dashboard
    await expect(page).toHaveURL(/.*\/dashboard/);
    await expect(page.locator("text=Dashboard Panel")).toBeVisible();
    await expect(page.locator("text=Jekz Dev").first()).toBeVisible();

    // 3. Prevent logged-in users from accessing login again
    await page.goto("/login");
    await expect(page).toHaveURL(/.*\/dashboard/);

    // 4. Logout
    const logoutResponsePromise = page.waitForResponse(
      "**/api-proxy/auth/logout",
    );
    const logoutBtn = page.locator("button[title='Keluar']");
    await logoutBtn.click();
    await logoutResponsePromise;
    await expect(page).toHaveURL(/.*\/login/);
  });

  test("should automatically perform silent token refresh on 401 response", async ({
    page,
  }) => {
    // Login first
    await page.goto("/login");
    // Wait for the initial session check to finish (ensures hydration)
    await page.waitForResponse("**/api-proxy/auth/refresh");

    const loginResponsePromise = page.waitForResponse(
      "**/api-proxy/auth/login",
    );
    await page.locator("input#email").fill("user@example.com");
    await page.locator("input#password").fill("password123");
    await page.getByRole("button", { name: "Masuk", exact: true }).click();
    await loginResponsePromise;
    await expect(page).toHaveURL(/.*\/dashboard/);

    // Reload dashboard, forcing it to fetch session
    // This will trigger the silent refresh (POST auth/refresh) and then profile fetch (GET auth/me)
    const refreshResponsePromise = page.waitForResponse(
      "**/api-proxy/auth/refresh",
    );
    const meResponsePromise = page.waitForResponse("**/api-proxy/auth/me");

    await page.reload();

    const refreshRes = await refreshResponsePromise;
    const meRes = await meResponsePromise;

    expect(refreshRes.status()).toBe(200);
    expect(meRes.status()).toBe(200);
    await expect(page.locator("text=Dashboard Panel")).toBeVisible();
  });
});

import { expect, test } from "@playwright/test";

test.describe("System Pages E2E Tests", () => {
  test("should display custom error boundary page on error", async ({
    page,
  }) => {
    // Suppress console error logs for this test to avoid polluting output
    page.on("pageerror", () => {});

    await page.goto("/test-error");

    // Check error page header and warning state
    await expect(page.locator("text=Terjadi Kesalahan Aplikasi")).toBeVisible();
    await expect(
      page.locator(
        "text=Maaf atas ketidaknyamanan ini. Sistem mengalami kendala saat",
      ),
    ).toBeVisible();
  });

  test("should display custom loading skeleton then show content", async ({
    page,
  }) => {
    // Navigate and resolve immediately once the HTML starts streaming
    await page.goto("/test-loading", { waitUntil: "commit" });

    // Check that loading skeleton is visible quickly
    await expect(page.locator("text=Memuat halaman...")).toBeVisible();

    // Confirm loading skeleton is gone and loaded content is shown
    // Use an extended timeout to allow compiling/rendering on slower systems
    await expect(page.locator("text=Memuat halaman...")).not.toBeVisible({
      timeout: 20000,
    });
    await expect(page.locator("#loaded-heading")).toBeVisible({
      timeout: 20000,
    });
    await expect(
      page.locator("text=Loaded Content Successfully"),
    ).toBeVisible();
  });

  test("should display custom 404 page on non-existent routes", async ({
    page,
  }) => {
    await page.goto("/this-route-does-not-exist-at-all");

    await expect(page.locator("text=Halaman Tidak Ditemukan")).toBeVisible();
    await expect(
      page.locator(
        "text=Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan",
      ),
    ).toBeVisible();
  });
});

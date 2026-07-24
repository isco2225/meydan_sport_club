import { defineConfig, devices } from "@playwright/test";

const baseURL = "http://localhost:3000";

/**
 * E2E testleri `e2e/` klasöründe tutulur (birim testleri src/ altında kalır).
 * Testler çalışmadan önce dev sunucusu otomatik başlatılır; zaten çalışıyorsa
 * yeniden kullanılır.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});

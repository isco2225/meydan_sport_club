import { test, expect } from "@playwright/test";

test.describe("mobil görünüm", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("hızlı iletişim çubuğu görünür ve arama/WhatsApp/harita bağlantılarını taşır", async ({
    page,
  }) => {
    await page.goto("/");
    const bar = page.getByRole("navigation", { name: "Hızlı iletişim" });
    await expect(bar).toBeVisible();
    await expect(bar.getByRole("link", { name: "Ara" })).toHaveAttribute(
      "href",
      /^tel:\+90\d{10}$/,
    );
    await expect(bar.getByRole("link", { name: "WhatsApp" })).toHaveAttribute(
      "href",
      /^https:\/\/wa\.me\/90\d{10}\?text=/,
    );
    await expect(bar.getByRole("link", { name: "Yol Tarifi" })).toHaveAttribute(
      "href",
      /^https:\/\/www\.google\.com\/maps\/search\//,
    );
  });

  test("menü açılır ve seçilen bölüme götürür", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Menüyü aç" }).click();
    await page
      .getByRole("navigation", { name: "Mobil menü" })
      .getByRole("link", { name: "Üyelik Ücretleri" })
      .click();
    await expect(page).toHaveURL(/#uyelik$/);
    await expect(
      page.getByRole("heading", { level: 2, name: "Üyelik Ücretleri" }),
    ).toBeVisible();
  });
});

test("masaüstünde hızlı iletişim çubuğu gizlidir", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("navigation", { name: "Hızlı iletişim", includeHidden: true }),
  ).toBeHidden();
});

test("alt sayfalar kendi başlığı ve paylaşım görseliyle açılır", async ({ page }) => {
  for (const [path, title] of [
    ["/uyelik", "Üyelik Ücretleri"],
    ["/kadinlar-salonu", "Beykoz Kadınlara Özel Spor Salonu"],
    ["/ders-programi", "Ders Programı"],
    ["/sss", "Sıkça Sorulan Sorular"],
    ["/iletisim", "İletişim"],
  ] as const) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1, name: title })).toBeVisible();
    await expect(page).toHaveTitle(`${title} · Meydan Sport Club`);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      /\/images\/og\/meydan-sport-club\.jpg$/,
    );
  }
});

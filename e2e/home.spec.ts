import { test, expect } from "@playwright/test";

test("ana sayfa açılır ve menüden bölümler arasında gezinilir", async ({
  page,
}) => {
  await page.goto("/");

  // Menü, footer'daki aynı bağlantılardan ayırmak için header'a (banner) sınırlanır.
  const navbar = page.getByRole("banner");

  // Hero (ana bölüm) görünür.
  await expect(
    page.getByRole("heading", { level: 1, name: /Hedeflerine/ }),
  ).toBeVisible();

  // Menüden "Antrenörlerimiz" bölümüne git.
  await navbar.getByRole("link", { name: "Antrenörlerimiz" }).click();
  await expect(page).toHaveURL(/#antrenorler$/);
  await expect(
    page.getByRole("heading", { level: 2, name: "Antrenörlerimiz" }),
  ).toBeVisible();

  // Menüden "İletişim" bölümüne git.
  await navbar.getByRole("link", { name: "İletişim" }).click();
  await expect(page).toHaveURL(/#iletisim$/);
  await expect(
    page.getByRole("heading", { level: 2, name: "İletişim" }),
  ).toBeVisible();

  // İletişim formu alanları görünür.
  await expect(page.getByLabel("Ad Soyad")).toBeVisible();
  await expect(page.getByLabel("E-posta")).toBeVisible();
  await expect(page.getByLabel("Mesajınız")).toBeVisible();
});

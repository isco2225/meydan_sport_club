import { describe, it, expect } from "vitest";
import { contactSchema } from "./contact";

const validInput = {
  name: "Ayşe Yılmaz",
  email: "ayse@example.com",
  message: "Merhaba, üyelik ücretleri hakkında bilgi almak istiyorum.",
};

describe("contactSchema", () => {
  it("geçerli veriyi kabul eder", () => {
    const result = contactSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("baştaki/sondaki boşlukları temizler", () => {
    const result = contactSchema.parse({
      ...validInput,
      name: "  Ayşe Yılmaz  ",
    });
    expect(result.name).toBe("Ayşe Yılmaz");
  });

  it("çok kısa ismi reddeder", () => {
    const result = contactSchema.safeParse({ ...validInput, name: "A" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toEqual(["name"]);
    }
  });

  it("geçersiz e-postayı reddeder", () => {
    const result = contactSchema.safeParse({
      ...validInput,
      email: "gecersiz-eposta",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toEqual(["email"]);
    }
  });

  it("çok kısa mesajı reddeder", () => {
    const result = contactSchema.safeParse({ ...validInput, message: "Kısa" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toEqual(["message"]);
    }
  });
});

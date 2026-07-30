import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { sendContactMessage } from "./contact-action";

const validPayload = {
  name: "Ayşe Yılmaz",
  email: "ayse@example.com",
  message: "Üyelik hakkında bilgi almak istiyorum.",
};

beforeEach(() => {
  vi.spyOn(console, "log").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("sendContactMessage", () => {
  it("geçerli veriyle başarı döner", async () => {
    const result = await sendContactMessage(validPayload);
    expect(result).toEqual({ status: "success" });
  });

  it("geçersiz veriyle hata döner", async () => {
    const result = await sendContactMessage({
      ...validPayload,
      email: "gecersiz",
    });
    expect(result.status).toBe("error");
  });

  it("eksik alanlarda hata döner", async () => {
    const result = await sendContactMessage({ name: "A" });
    expect(result.status).toBe("error");
  });

  it("honeypot doluysa sessizce başarı döner ve mesajı işlemez", async () => {
    const result = await sendContactMessage({
      ...validPayload,
      website: "https://spam.example",
    });
    expect(result).toEqual({ status: "success" });
    // Bot isteği loglanmaz (ileride: e-posta gönderilmez).
    expect(console.log).not.toHaveBeenCalled();
  });

  it("honeypot boşsa normal akış çalışır", async () => {
    const result = await sendContactMessage({ ...validPayload, website: "" });
    expect(result).toEqual({ status: "success" });
  });
});

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { sendContactMessage } from "./contact-action";

const sendMock = vi.hoisted(() => vi.fn());

vi.mock("resend", () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

const validPayload = {
  name: "Ayşe Yılmaz",
  email: "ayse@example.com",
  message: "Üyelik hakkında bilgi almak istiyorum.",
};

beforeEach(() => {
  sendMock.mockReset();
  sendMock.mockResolvedValue({ data: { id: "email-id" }, error: null });
  vi.stubEnv("RESEND_API_KEY", "re_test_anahtar");
  vi.stubEnv("CONTACT_TO_EMAIL", "salon@example.com");
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("sendContactMessage", () => {
  it("geçerli veriyle e-postayı gönderir ve başarı döner", async () => {
    const result = await sendContactMessage(validPayload);

    expect(result).toEqual({ status: "success" });
    expect(sendMock).toHaveBeenCalledWith({
      from: "Meydan Sport Club <onboarding@resend.dev>",
      to: "salon@example.com",
      replyTo: "ayse@example.com",
      subject: "İletişim formu: Ayşe Yılmaz",
      text: "Ad Soyad: Ayşe Yılmaz\nE-posta: ayse@example.com\n\nÜyelik hakkında bilgi almak istiyorum.",
    });
  });

  it("geçersiz veriyle hata döner ve e-posta göndermez", async () => {
    const result = await sendContactMessage({
      ...validPayload,
      email: "gecersiz",
    });

    expect(result.status).toBe("error");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("honeypot doluysa sessizce başarı döner ve e-posta göndermez", async () => {
    const result = await sendContactMessage({
      ...validPayload,
      website: "https://spam.example",
    });

    expect(result).toEqual({ status: "success" });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("honeypot boşsa normal akış çalışır", async () => {
    const result = await sendContactMessage({ ...validPayload, website: "" });
    expect(result).toEqual({ status: "success" });
    expect(sendMock).toHaveBeenCalledOnce();
  });

  it("ortam değişkenleri eksikse kullanıcıya hata döner", async () => {
    vi.stubEnv("RESEND_API_KEY", "");

    const result = await sendContactMessage(validPayload);

    expect(result.status).toBe("error");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("Resend hata dönerse kullanıcıya hata iletilir", async () => {
    sendMock.mockResolvedValue({
      data: null,
      error: { name: "application_error", message: "boom" },
    });

    const result = await sendContactMessage(validPayload);

    expect(result.status).toBe("error");
  });
});

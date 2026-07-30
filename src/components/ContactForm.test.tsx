import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "./ContactForm";
import { sendContactMessage } from "@/lib/contact-action";

vi.mock("@/lib/contact-action", () => ({
  sendContactMessage: vi.fn(),
}));

const mockSend = vi.mocked(sendContactMessage);

beforeEach(() => {
  mockSend.mockReset();
});

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Ad Soyad"), "Ayşe Yılmaz");
  await user.type(screen.getByLabelText("E-posta"), "ayse@example.com");
  await user.type(
    screen.getByLabelText("Mesajınız"),
    "Üyelik hakkında bilgi almak istiyorum.",
  );
}

describe("ContactForm", () => {
  it("boş gönderimde doğrulama hataları gösterir ve action'ı çağırmaz", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: "Gönder" }));

    expect(
      await screen.findByText("Ad Soyad en az 2 karakter olmalıdır."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Geçerli bir e-posta adresi girin."),
    ).toBeInTheDocument();
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("geçerli veriyle action'ı honeypot alanıyla birlikte çağırır", async () => {
    mockSend.mockResolvedValue({ status: "success" });
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: "Gönder" }));

    expect(mockSend).toHaveBeenCalledWith({
      name: "Ayşe Yılmaz",
      email: "ayse@example.com",
      message: "Üyelik hakkında bilgi almak istiyorum.",
      website: "",
    });
  });

  it("başarıda onay mesajı gösterir ve formu sıfırlar", async () => {
    mockSend.mockResolvedValue({ status: "success" });
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: "Gönder" }));

    expect(await screen.findByRole("status")).toHaveTextContent(
      "Mesajınız alındı.",
    );
    expect(screen.getByLabelText("Ad Soyad")).toHaveValue("");
  });

  it("hata sonucunda action'dan gelen mesajı gösterir", async () => {
    mockSend.mockResolvedValue({
      status: "error",
      message: "Bir şeyler ters gitti.",
    });
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: "Gönder" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Bir şeyler ters gitti.",
    );
  });
});

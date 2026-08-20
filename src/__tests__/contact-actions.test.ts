import { afterEach, describe, expect, it, vi } from "vitest";

import { sendContactMessage } from "@/app/(front)/contact/actions";

vi.mock("resend", () => {
  const send = vi.fn();
  class Resend {
    emails: { send: ReturnType<typeof vi.fn> };
    constructor() {
      this.emails = { send };
    }
  }
  return { Resend, __send: send };
});

import * as resendModule from "resend";

const mockSend = (resendModule as unknown as { __send: ReturnType<typeof vi.fn> }).__send;

const valid = {
  name: "สมชาย",
  email: "somchai@example.com",
  subject: "สอบถามสินค้า",
  message: "สวัสดีครับ ผมสนใจสินค้าตัวนี้ครับ",
};

afterEach(() => {
  vi.clearAllMocks();
  vi.unstubAllEnvs();
});

describe("sendContactMessage", () => {
  it("returns fieldError for invalid input", async () => {
    const result = await sendContactMessage({ ...valid, email: "bad" });
    expect(result.status).toBe("fieldError");
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("returns success without sending email when honeypot is filled", async () => {
    const result = await sendContactMessage({ ...valid, website: "spam-url" });
    expect(result).toEqual({ status: "success" });
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("returns error without leaking internals when env is missing", async () => {
    const result = await sendContactMessage(valid);
    expect(result).toEqual({
      status: "error",
      message: expect.any(String),
    });
    expect(result).not.toHaveProperty("error");
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("sends email with replyTo set to the submitter and returns success", async () => {
    mockSend.mockResolvedValueOnce({ data: { id: "mock-id" }, error: null });
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_FROM_EMAIL", "store@example.com");
    vi.stubEnv("CONTACT_TO_EMAIL", "admin@example.com");

    const result = await sendContactMessage(valid);

    expect(result).toEqual({ status: "success" });
    expect(mockSend).toHaveBeenCalledTimes(1);
    const sendArgs = mockSend.mock.calls[0][0];
    expect(sendArgs.from).toBe("store@example.com");
    expect(sendArgs.to).toEqual(["admin@example.com"]);
    expect(sendArgs.replyTo).toBe("somchai@example.com");
  });

  it("returns generic error when resend reports an error", async () => {
    mockSend.mockResolvedValueOnce({
      data: null,
      error: { name: "Error", message: "rate_limit_exceeded" },
    });
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_FROM_EMAIL", "store@example.com");
    vi.stubEnv("CONTACT_TO_EMAIL", "admin@example.com");

    const result = await sendContactMessage(valid);
    expect(result.status).toBe("error");
    expect(JSON.stringify(result)).not.toContain("rate_limit_exceeded");
  });
});
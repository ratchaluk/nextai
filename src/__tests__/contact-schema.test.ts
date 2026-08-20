import { describe, expect, it } from "vitest";

import { contactSchema } from "@/lib/contact-schema";

const valid = {
  name: "สมชาย",
  email: "somchai@example.com",
  subject: "สอบถามสินค้า",
  message: "สวัสดีครับ ผมสนใจสินค้าตัวนี้ครับ",
};

describe("contactSchema", () => {
  it("accepts a valid contact message", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("accepts an empty honeypot field", () => {
    expect(
      contactSchema.safeParse({ ...valid, website: "" }).success
    ).toBe(true);
  });

  it("rejects a name that is too short", () => {
    const result = contactSchema.safeParse({ ...valid, name: "ก" });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = contactSchema.safeParse({ ...valid, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects a subject that is too short", () => {
    const result = contactSchema.safeParse({ ...valid, subject: "ab" });
    expect(result.success).toBe(false);
  });

  it("rejects a message that is too short", () => {
    const result = contactSchema.safeParse({ ...valid, message: "สั้น" });
    expect(result.success).toBe(false);
  });

  it("rejects a message that exceeds 2000 characters", () => {
    const result = contactSchema.safeParse({
      ...valid,
      message: "ก".repeat(2001),
    });
    expect(result.success).toBe(false);
  });

  it("accepts a honeypot field that is filled (handled by the action, not the schema)", () => {
    const result = contactSchema.safeParse({
      ...valid,
      website: "spam-url",
    });
    expect(result.success).toBe(true);
  });
});

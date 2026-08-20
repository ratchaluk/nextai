import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "กรุณากรอกชื่อ (2–100 ตัวอักษร)")
    .max(100, "ชื่อยาวเกิน 100 ตัวอักษร"),
  email: z.string().trim().email("อีเมลไม่ถูกต้อง"),
  subject: z
    .string()
    .trim()
    .min(3, "หัวข้อสั้นเกินไป (3–150 ตัวอักษร)")
    .max(150, "หัวข้อยาวเกิน 150 ตัวอักษร"),
  message: z
    .string()
    .trim()
    .min(10, "ข้อความสั้นเกินไป (10–2000 ตัวอักษร)")
    .max(2000, "ข้อความยาวเกิน 2000 ตัวอักษร"),
  // Honeypot — hidden field that real users never fill. Bots do.
  website: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
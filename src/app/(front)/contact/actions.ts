"use server";

import { Resend } from "resend";

import { contactSchema } from "@/lib/contact-schema";

export type ContactActionState =
  | { status: "success" }
  | { status: "fieldError"; fieldErrors: Record<string, string> }
  | { status: "error"; message: string };

const ERROR_MESSAGE =
  "ไม่สามารถส่งข้อความได้ในขณะนี้ กรุณาลองใหม่อีกครั้งภายหลัง";

export async function sendContactMessage(
  input: unknown
): Promise<ContactActionState> {
  const parsed = contactSchema.safeParse(input);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "");
      if (key && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return { status: "fieldError", fieldErrors };
  }

  const { name, email, subject, message, website } = parsed.data;

  // Honeypot filled → pretend success, but never actually send the email.
  if (website) {
    return { status: "success" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !fromEmail || !toEmail) {
    console.error(
      "Contact form: missing RESEND_API_KEY, CONTACT_FROM_EMAIL or CONTACT_TO_EMAIL"
    );
    return { status: "error", message: ERROR_MESSAGE };
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `[Contact] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
    });

    if (error || !data) {
      console.error("Contact form: Resend send failed", error);
      return { status: "error", message: ERROR_MESSAGE };
    }

    return { status: "success" };
  } catch (err) {
    console.error("Contact form: unexpected error", err);
    return { status: "error", message: ERROR_MESSAGE };
  }
}
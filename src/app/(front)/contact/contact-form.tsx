"use client";

import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  contactSchema,
  type ContactFormValues,
} from "@/lib/contact-schema";
import { sendContactMessage } from "./actions";

export default function ContactForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    },
  });

  function onSubmit(data: ContactFormValues) {
    setSubmitError(null);
    setSuccess(false);

    startTransition(async () => {
      const result = await sendContactMessage(data);

      if (result.status === "success") {
        setSuccess(true);
        form.reset();
        return;
      }

      if (result.status === "fieldError") {
        for (const [name, message] of Object.entries(result.fieldErrors)) {
          form.setError(name as keyof ContactFormValues, { message });
        }
        return;
      }

      setSubmitError(result.message);
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="contact-name">ชื่อ</FieldLabel>
              <Input
                {...field}
                id="contact-name"
                autoComplete="name"
                aria-invalid={fieldState.invalid}
                aria-describedby={fieldState.error ? "contact-name-error" : undefined}
                placeholder="ชื่อของคุณ"
              />
              {fieldState.invalid && (
                <FieldError id="contact-name-error" errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="contact-email">อีเมล</FieldLabel>
              <Input
                {...field}
                id="contact-email"
                type="email"
                autoComplete="email"
                aria-invalid={fieldState.invalid}
                aria-describedby={fieldState.error ? "contact-email-error" : undefined}
                placeholder="you@example.com"
              />
              {fieldState.invalid && (
                <FieldError id="contact-email-error" errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="subject"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="contact-subject">หัวข้อ</FieldLabel>
              <Input
                {...field}
                id="contact-subject"
                aria-invalid={fieldState.invalid}
                aria-describedby={fieldState.error ? "contact-subject-error" : undefined}
                placeholder="เรื่องที่ต้องการติดต่อ"
              />
              {fieldState.invalid && (
                <FieldError id="contact-subject-error" errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="message"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="contact-message">ข้อความ</FieldLabel>
              <Textarea
                {...field}
                id="contact-message"
                aria-invalid={fieldState.invalid}
                aria-describedby={fieldState.error ? "contact-message-error" : undefined}
                placeholder="รายละเอียดข้อความ (10–2000 ตัวอักษร)"
              />
              {fieldState.invalid && (
                <FieldError id="contact-message-error" errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        {/* Honeypot — visually hidden, only bots fill this */}
        <div className="sr-only" aria-hidden="true">
          <FieldLabel htmlFor="contact-website">Website</FieldLabel>
          <Input {...form.register("website")} id="contact-website" tabIndex={-1} autoComplete="off" />
        </div>

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? <Spinner /> : "ส่งข้อความ"}
        </Button>

        {success && (
          <p
            role="status"
            aria-live="polite"
            className="border-[3px] border-black bg-card px-4 py-3 text-sm"
          >
            ส่งข้อความสำเร็จ เราจะติดต่อกลับโดยเร็วที่สุด
          </p>
        )}

        {submitError && (
          <p
            role="alert"
            className="border-[3px] border-destructive bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            {submitError}
          </p>
        )}
      </FieldGroup>
    </form>
  );
}
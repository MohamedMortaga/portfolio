"use server";

import { Resend } from "resend";

import {
  normalizeMessage,
  validateContact,
  type ContactErrors,
} from "@/lib/contact-validation";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: ContactErrors;
  sentAt?: number; // changes on every success, used to reset the form
};

export async function sendEmail(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Honeypot: real people never fill this hidden field, bots do
  if (formData.get("company")) {
    return { status: "success", message: "Thanks! Your message was sent.", sentAt: Date.now() };
  }

  const values = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    message: normalizeMessage(String(formData.get("message") ?? "")).trim(),
  };

  // Same rules as the form — never trust the browser alone
  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please fix the fields below.", errors };
  }

  const to = process.env.CONTACT_EMAIL;
  if (!process.env.RESEND_API_KEY || !to) {
    console.error("Missing RESEND_API_KEY or CONTACT_EMAIL in .env.local");
    return { status: "error", message: "Email service is not configured." };
  }

  // Created here (not at the top) so a missing key never crashes the page
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to,
    replyTo: values.email, // hitting "Reply" in Gmail answers the visitor directly
    subject: `New portfolio message from ${values.name}`,
    text: `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`,
  });

  if (error) {
    console.error(error);
    return {
      status: "error",
      message: "Something went wrong. Please try again or email me directly.",
    };
  }

  return {
    status: "success",
    message: "Thanks! Your message was sent. I'll get back to you soon.",
    sentAt: Date.now(),
  };
}
"use client";

import { useActionState, useState } from "react";
import { CheckCircle2, Loader2, Send, TriangleAlert } from "lucide-react";

import { sendEmail, type ContactState } from "@/actions/send-email";
import {
  MESSAGE_MAX,
  normalizeMessage,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactValues,
} from "@/lib/contact-validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const initialState: ContactState = { status: "idle", message: "" };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendEmail, initialState);

  return (
    <div className="flex min-w-0 flex-col gap-4">
      {/* A new key after each success remounts the fields = empty form */}
      <FormFields
        key={state.sentAt ?? "form"}
        action={formAction}
        pending={pending}
        serverErrors={state.errors}
      />

      {state.status !== "idle" && state.message && (
        <p
          role="status"
          className={cn(
            "flex items-center gap-2 rounded-lg px-4 py-3 text-sm",
            state.status === "success"
              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
              : "bg-[#e05d5d]/10 text-[#c94545] dark:text-[#f08080]"
          )}
        >
          {state.status === "success" ? (
            <CheckCircle2 className="size-4 shrink-0" />
          ) : (
            <TriangleAlert className="size-4 shrink-0" />
          )}
          {state.message}
        </p>
      )}
    </div>
  );
}

const empty: ContactValues = { name: "", email: "", message: "" };
const noneTouched: Record<ContactField, boolean> = {
  name: false,
  email: false,
  message: false,
};

function FormFields({
  action,
  pending,
  serverErrors,
}: {
  action: (formData: FormData) => void;
  pending: boolean;
  serverErrors?: ContactErrors;
}) {
  const [values, setValues] = useState<ContactValues>(empty);
  const [touched, setTouched] = useState(noneTouched);

  // Live validation: recalculated on every keystroke
  const errors = validateContact(values);
  const hasErrors = Object.keys(errors).length > 0;

  // Show a field's error only after the visitor has left it (or tried to send)
  const errorFor = (field: ContactField) =>
    touched[field] ? errors[field] : serverErrors?.[field];

  const update = (field: ContactField) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setValues((v) => ({ ...v, [field]: e.target.value }));

  const touch = (field: ContactField) => () =>
    setTouched((t) => ({ ...t, [field]: true }));

  const messageLength = normalizeMessage(values.message).length;

  return (
    <form
      action={action}
      noValidate
      onSubmit={(e) => {
        if (hasErrors) {
          e.preventDefault(); // don't hit the server with a broken form
          setTouched({ name: true, email: true, message: true });
        }
      }}
      className="flex min-w-0 flex-1 flex-col gap-5 rounded-2xl border bg-card p-6 shadow-sm sm:p-8"
    >
      {/* Honeypot (hidden from people) */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={errorFor("name")}>
          <Input
            id="name"
            name="name"
            placeholder="Your name"
            autoComplete="name"
            value={values.name}
            onChange={update("name")}
            onBlur={touch("name")}
            aria-invalid={!!errorFor("name")}
          />
        </Field>
        <Field id="email" label="Email" error={errorFor("email")}>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={values.email}
            onChange={update("email")}
            onBlur={touch("email")}
            aria-invalid={!!errorFor("email")}
          />
        </Field>
      </div>

      <Field
        id="message"
        label="Message"
        error={errorFor("message")}
        className="flex-1"
        hint={
          <span
            className={cn(
              "font-mono",
              messageLength > MESSAGE_MAX && "text-[#c94545] dark:text-[#f08080]"
            )}
          >
            {messageLength}/{MESSAGE_MAX}
          </span>
        }
      >
        <Textarea
          id="message"
          name="message"
          placeholder="Tell me about your project or opportunity…"
          value={values.message}
          onChange={update("message")}
          onBlur={touch("message")}
          aria-invalid={!!errorFor("message")}
          // fills the remaining height of the form; scrolls inside when full
          className="field-sizing-fixed h-full min-h-40 flex-1 resize-none overflow-y-auto [overflow-wrap:anywhere]"
        />
      </Field>

      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-fit">
        {pending ? (
          <>
            <Loader2 className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <Send />
          </>
        )}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  hint,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center justify-between text-sm">
        <label htmlFor={id} className="font-medium">
          {label}
        </label>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      {children}
      {error && (
        <p className="text-xs text-[#c94545] dark:text-[#f08080]">{error}</p>
      )}
    </div>
  );
}
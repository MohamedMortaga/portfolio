// Shared by the form (live validation) and the server action (final check)

export type ContactField = "name" | "email" | "message";
export type ContactValues = Record<ContactField, string>;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 2000;

/** Browsers send new lines as "\r\n" — count each one as a single character */
export function normalizeMessage(message: string) {
  return message.replace(/\r\n/g, "\n");
}

/** Rejects text that looks like code or HTML */
export function looksLikeCode(text: string) {
  return (
    /<\/?[a-z][\s\S]*?>/i.test(text) || // HTML tags: <div>, <script>
    /```/.test(text) || // markdown code blocks
    /\b(function|const|let|var|import|export)\b[^\n]*[=({]/.test(text) || // JS
    /[{};]\s*\n.*[{};]/.test(text) // several lines ending with ; { }
  );
}

export function validateContact(values: ContactValues): ContactErrors {
  const name = values.name.trim();
  const email = values.email.trim();
  const message = normalizeMessage(values.message).trim();
  const errors: ContactErrors = {};

  if (name.length < 2) errors.name = "Please enter your name.";
  else if (name.length > 80) errors.name = "Name is too long.";

  if (!email) errors.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Please enter a valid email.";

  if (message.length < MESSAGE_MIN)
    errors.message = `Message should be at least ${MESSAGE_MIN} characters.`;
  else if (looksLikeCode(message))
    errors.message = "Please write your message as plain text, without code.";
  else if (message.length > MESSAGE_MAX)
    errors.message = `Message is too long (max ${MESSAGE_MAX} characters).`;

  return errors;
}
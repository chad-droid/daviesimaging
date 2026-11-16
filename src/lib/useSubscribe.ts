"use client";

import { useRef, useState } from "react";
import posthog from "posthog-js";

export type SubscribeStatus = "idle" | "sending" | "done" | "error";

// Shared by the footer form and the email capture modal. Posts to
// /api/subscribe, which sits behind the invisible captcha (BotID). The captcha
// result is attached to the request automatically because the route is listed
// in instrumentation-client.ts.
export function useSubscribe(source: "footer" | "modal") {
  const [status, setStatus] = useState<SubscribeStatus>("idle");
  const [error, setError] = useState("");
  // First time the visitor touches the form. Measured from here, not from page
  // load, so the server can tell a person from an instant script.
  const startedAt = useRef<number | null>(null);

  function touch() {
    if (startedAt.current === null) startedAt.current = Date.now();
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const data = new FormData(e.currentTarget);
    setStatus("sending");
    setError("");
    posthog.capture("newsletter_subscription_started", { source });
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          firstName: data.get("firstName") ?? "",
          hp: data.get("hp_field") ?? "",
          elapsedMs: startedAt.current === null ? null : Date.now() - startedAt.current,
          source,
        }),
      });
      if (res.ok) {
        setStatus("done");
        return;
      }
      setError(
        res.status === 400
          ? "Please enter a valid email address."
          : "That did not go through. Please try again in a moment."
      );
      setStatus("error");
    } catch {
      setError("That did not go through. Please check your connection and try again.");
      setStatus("error");
    }
  }

  return { status, error, submit, touch };
}

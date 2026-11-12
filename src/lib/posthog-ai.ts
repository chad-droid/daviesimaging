import { randomUUID } from "node:crypto";
import Anthropic from "@anthropic-ai/sdk";
import { Anthropic as PostHogAnthropic } from "@posthog/ai/anthropic";
import { PostHog } from "posthog-node";

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
const anthropicApiKey = process.env.ANTHROPIC_API_KEY;

if (!projectToken && process.env.NODE_ENV !== "production") {
  console.warn("NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is configured");
}

if (!host && process.env.NODE_ENV !== "production") {
  console.warn("NEXT_PUBLIC_POSTHOG_HOST variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NEXT_PUBLIC_POSTHOG_HOST is configured");
}

const posthog = projectToken && host
  ? new PostHog(projectToken, {
      host,
      privacyMode: true,
      flushAt: 1,
      flushInterval: 0,
      requestTimeout: 2000,
      fetchRetryCount: 0,
    })
  : null;

export const anthropic = posthog && anthropicApiKey
  ? new PostHogAnthropic({ apiKey: anthropicApiKey, posthog })
  : new Anthropic({ apiKey: anthropicApiKey });

export function getAnthropicObservabilityOptions(aiSessionId: string) {
  return posthog
    ? {
        posthogTraceId: randomUUID(),
        posthogProperties: { $ai_session_id: aiSessionId },
      }
    : {};
}

export async function flushPostHogAi() {
  if (posthog) await posthog.flush().catch(() => {});
}

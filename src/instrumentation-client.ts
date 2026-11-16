import posthog from "posthog-js"
import { initBotId } from "botid/client/core"

// Invisible captcha (Vercel BotID). Requests to the routes listed here carry a
// proof that a real browser made them; the route checks it with checkBotId().
// A route that calls checkBotId() must be listed here or real visitors fail.
initBotId({
  protect: [{ path: "/api/subscribe", method: "POST" }],
})

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST

if (token && host) {
  posthog.init(token, {
    api_host: host,
    defaults: "2025-05-24",
    capture_exceptions: true,
    debug: process.env.NODE_ENV === "development",
  })
} else if (process.env.NODE_ENV === "development") {
  const missingVariable = token
    ? "NEXT_PUBLIC_POSTHOG_HOST"
    : "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN"

  console.error(
    `${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`
  )
}

// Mailchimp API keys end in "-<datacenter>" (for example "-us17"), and the API
// host has to match that datacenter or Mailchimp answers 403. Read it from the
// key so a wrong or stale MAILCHIMP_SERVER value cannot break signups;
// MAILCHIMP_SERVER is only the fallback for a key with no suffix.
export function mailchimpApiBase(apiKey: string, fallbackServer?: string): string | null {
  const suffix = apiKey.trim().split("-").pop() ?? "";
  const dc = /^[a-z]{2,}\d+$/i.test(suffix) && apiKey.includes("-") ? suffix : fallbackServer?.trim();
  return dc ? `https://${dc.toLowerCase()}.api.mailchimp.com/3.0` : null;
}

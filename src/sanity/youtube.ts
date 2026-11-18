// Shared by the Sanity schema (validation, Studio preview) and the blog
// renderer. Relative imports only: sanity.config.ts is built by Vite.

const ID = /^[A-Za-z0-9_-]{11}$/;

/** Returns the 11-character video id from a watch, youtu.be, shorts or embed link. */
export function youTubeId(input: string): string | null {
  let url: URL;
  try {
    url = new URL(input.trim());
  } catch {
    return null;
  }
  const host = url.hostname.replace(/^(www\.|m\.)/, "");
  let id: string | null = null;
  if (host === "youtu.be") {
    id = url.pathname.split("/")[1] ?? null;
  } else if (host === "youtube.com" || host === "youtube-nocookie.com") {
    if (url.pathname === "/watch") id = url.searchParams.get("v");
    else {
      const m = url.pathname.match(/^\/(?:shorts|embed|live)\/([^/?#]+)/);
      id = m?.[1] ?? null;
    }
  }
  return id && ID.test(id) ? id : null;
}

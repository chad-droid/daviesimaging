import { createHmac, timingSafeEqual } from "crypto";
import type { NextRequest } from "next/server";

/**
 * /tollbrothers-partnership-2027: a password-gated client presentation.
 *
 * The presentation itself (a self-contained HTML app built for the meeting) is
 * NOT in this repo, because the repo is public and the presentation holds
 * client-only detail. It lives in Vercel Blob under two unguessable prefixes:
 *   TOLL_2027_PRIVATE_BASE  index.html and data.js, read only by this route
 *   TOLL_2027_MEDIA_BASE    photos, video, fonts, map; loaded by the browser
 * TOLL_2027_PASSWORD is the shared password. All three are Vercel env vars.
 * The route fails closed: if any is missing, nobody gets in.
 */

export const PATH = "/tollbrothers-partnership-2027";
const COOKIE = "toll2027";

export function config() {
  const password = process.env.TOLL_2027_PASSWORD;
  const privateBase = process.env.TOLL_2027_PRIVATE_BASE;
  const mediaBase = process.env.TOLL_2027_MEDIA_BASE;
  if (!password || !privateBase || !mediaBase) return null;
  const slash = (u: string) => (u.endsWith("/") ? u : u + "/");
  return { password, privateBase: slash(privateBase), mediaBase: slash(mediaBase) };
}

// The cookie holds an HMAC of the password, so changing the password signs everyone out
export function token(password: string) {
  return createHmac("sha256", password).update("toll-brothers-partnership-2027").digest("hex");
}

function same(a: string, b: string) {
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function isSignedIn(req: NextRequest) {
  const cfg = config();
  if (!cfg) return false;
  const c = req.cookies.get(COOKIE)?.value;
  return !!c && same(c, token(cfg.password));
}

export function passwordMatches(input: string) {
  const cfg = config();
  return !!cfg && same(input, cfg.password);
}

export const cookieName = COOKIE;

export const privateHeaders = {
  "Cache-Control": "private, no-store",
  "X-Robots-Tag": "noindex, nofollow",
  "Referrer-Policy": "no-referrer",
};

/** Branded sign-in page, styled like the site: charcoal, Cormorant headline, violet pill. */
export function passwordPage(mediaBase: string | null, error: boolean) {
  const font = mediaBase
    ? `@font-face{font-family:"Cormorant Garamond";font-weight:400;src:url(${mediaBase}fonts/cormorant-garamond-latin-400-normal.woff2) format("woff2")}
       @font-face{font-family:"Cormorant Garamond";font-weight:600;src:url(${mediaBase}fonts/cormorant-garamond-latin-600-normal.woff2) format("woff2")}
       @font-face{font-family:"Noto Sans";font-weight:400;src:url(${mediaBase}fonts/noto-sans-latin-400-normal.woff2) format("woff2")}
       @font-face{font-family:"Noto Sans";font-weight:700;src:url(${mediaBase}fonts/noto-sans-latin-700-normal.woff2) format("woff2")}`
    : "";
  const logo = mediaBase ? `<img src="${mediaBase}img/dig-paper.png" alt="dig" class="logo">` : `<p class="logo-text">dig</p>`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Toll Brothers partnership | Davies Imaging Group</title>
<style>
${font}
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%;background:#121212;color:#F5F5F5;font-family:"Noto Sans",system-ui,sans-serif;-webkit-font-smoothing:antialiased}
body{display:flex;align-items:center;justify-content:center;padding:24px;position:relative;overflow:hidden}
body::before{content:"";position:absolute;left:-10vw;top:-25vh;width:60vw;height:60vw;border-radius:50%;background:color-mix(in srgb,#6A5ACD 16%,transparent);filter:blur(130px);pointer-events:none}
main{position:relative;width:100%;max-width:440px}
.logo{height:28px;display:block;margin-bottom:48px}
.logo-text{font-weight:700;font-size:24px;margin-bottom:48px}
.eyebrow{font-size:12px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.6)}
.eyebrow b{color:#857AE0}
h1{font-family:"Cormorant Garamond",Georgia,serif;font-weight:400;font-size:44px;line-height:1.08;margin:16px 0 0}
h1 strong{font-weight:600}
p.lead{color:rgba(255,255,255,.75);font-size:16px;line-height:1.6;margin-top:16px}
form{margin-top:32px;display:flex;flex-direction:column;gap:12px}
label{font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.6)}
input{width:100%;height:52px;border-radius:999px;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.04);color:#fff;font:inherit;font-size:16px;padding:0 22px;outline:none}
input:focus{border-color:#6A5ACD}
button{height:52px;border-radius:999px;border:0;background:#6A5ACD;color:#fff;font:inherit;font-size:14px;font-weight:700;cursor:pointer;margin-top:8px}
button:hover{background:#5848B5}
.error{color:#E57373;font-size:14px}
.foot{margin-top:40px;font-size:12px;color:rgba(255,255,255,.45)}
.foot a{color:rgba(255,255,255,.7)}
</style></head><body><main>
${logo}
<p class="eyebrow">Toll Brothers <span style="color:rgba(255,255,255,.35)">/</span> <b>Partnership</b></p>
<h1>Regional Partnerships, <strong>2027</strong></h1>
<p class="lead">Prepared for Toll Brothers corporate marketing. Enter the password to view the presentation.</p>
<form method="post" action="${PATH}">
<label for="pw">Password</label>
<input id="pw" name="password" type="password" autocomplete="current-password" autofocus required>
${error ? `<p class="error">That password did not work. Try again.</p>` : ""}
<button type="submit">View the presentation</button>
</form>
<p class="foot"><a href="https://www.daviesimaging.com">daviesimaging.com</a></p>
</main></body></html>`;
}

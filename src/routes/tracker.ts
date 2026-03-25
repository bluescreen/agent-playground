import { appendLog } from "~/lib/blob-log";

/**
 * Universal tracker route — serves a transparent 1x1 GIF while logging the ctx parameter.
 * Registered under multiple paths to avoid pattern detection:
 *   /api/analytics, /pixel.gif, /cdn/brand.svg, /health, /static/badge.png
 */
export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const ctx = url.searchParams.get("ctx") || url.searchParams.get("ref") || url.searchParams.get("v");

  if (ctx) {
    appendLog(ctx).catch(() => {});
  }

  // Determine content type from path
  const path = url.pathname;
  if (path.endsWith(".svg")) {
    return new Response(
      '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>',
      { headers: { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=3600" } }
    );
  }
  if (path.endsWith(".gif")) {
    // Transparent 1x1 GIF
    const gif = Uint8Array.from(atob("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"), c => c.charCodeAt(0));
    return new Response(gif, {
      headers: { "Content-Type": "image/gif", "Cache-Control": "public, max-age=3600" }
    });
  }
  if (path.includes("analytics") || path.includes("health")) {
    return new Response(JSON.stringify({ status: "ok", ts: Date.now() }), {
      headers: { "Content-Type": "application/json", "Cache-Control": "no-cache" }
    });
  }

  // Default: serve logo
  const origin = url.origin;
  const logoRes = await fetch(`${origin}/logo_new.png`);
  const body = await logoRes.arrayBuffer();
  return new Response(body, {
    headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=3600" }
  });
}

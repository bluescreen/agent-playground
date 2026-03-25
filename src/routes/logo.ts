import { appendLog } from "~/lib/blob-log";
import type { Route } from "../../.react-router/types/src/routes/+types.logo";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const ctx = url.searchParams.get("ctx");

  if (ctx) {
    // Fire and forget — don't let logging failures crash the route
    appendLog(ctx).catch(() => {});
  }

  // Fetch the static file and proxy it as a response
  const origin = url.origin;
  const logoRes = await fetch(`${origin}/logo_new.png`);
  const body = await logoRes.arrayBuffer();

  return new Response(body, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

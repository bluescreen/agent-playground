import { appendLog } from "~/lib/blob-log";
import type { Route } from "../../.react-router/types/src/routes/+types.ping";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const ctx = url.searchParams.get("ctx");

  if (ctx) await appendLog(ctx);

  return Response.json({ pong: true, ctx: ctx ?? null });
}

export async function action({ request }: Route.ActionArgs) {
  const body = await request.json();
  const ctx = body?.ctx ?? null;

  if (ctx) await appendLog(ctx);

  return Response.json({ pong: true, ctx });
}

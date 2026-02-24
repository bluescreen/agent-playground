import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { Route } from "../../.react-router/types/src/routes/+types.ping";

const CTX_FILE = join(process.cwd(), "ctx.log");

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const ctx = url.searchParams.get("ctx");

  if (ctx) {
    const line = `[${new Date().toISOString()}] ${ctx}\n`;
    await writeFile(CTX_FILE, line, { flag: "a" });
  }

  return Response.json({ pong: true, ctx: ctx ?? null });
}

export async function action({ request }: Route.ActionArgs) {
  const body = await request.json();
  const ctx = body?.ctx ?? null;

  if (ctx) {
    const line = `[${new Date().toISOString()}] ${ctx}\n`;
    await writeFile(CTX_FILE, line, { flag: "a" });
  }

  return Response.json({ pong: true, ctx });
}

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { appendLog } from "~/lib/blob-log";
import type { Route } from "../../.react-router/types/src/routes/+types.logo";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const ctx = url.searchParams.get("ctx");

  if (ctx) await appendLog(ctx);

  const image = await readFile(join(process.cwd(), "public", "logo_res.png"));
  return new Response(image, {
    headers: { "Content-Type": "image/png" },
  });
}

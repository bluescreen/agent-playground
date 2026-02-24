import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { put, list } from "@vercel/blob";
import type { Route } from "../../.react-router/types/src/routes/+types.logo";

const BLOB_KEY = "ctx.log";

async function logCtx(ctx: string | null) {
  if (!ctx) return;
  try {
    let currentContent = "";
    const { blobs } = await list({ prefix: BLOB_KEY });
    if (blobs[0]) {
      const response = await fetch(blobs[0].url, {
        headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
      });
      if (response.ok) {
        currentContent = await response.text();
      }
    }

    const line = `[${new Date().toISOString()}] ${ctx}\n`;
    await put(BLOB_KEY, currentContent + line, {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
  } catch (error) {
    console.error("Failed to write to blob:", error);
  }
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const ctx = url.searchParams.get("ctx");

  await logCtx(ctx);

  const imagePath = join(process.cwd(), "public", "logo_res.png");
  const image = await readFile(imagePath);

  return new Response(image, {
    headers: { "Content-Type": "image/png" },
  });
}

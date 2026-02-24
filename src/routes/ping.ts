import { put, list } from "@vercel/blob";
import type { Route } from "../../.react-router/types/src/routes/+types.ping";

const BLOB_KEY = "ctx.log";

async function logCtx(ctx: string | null): Promise<{ url: string | null; error?: string }> {
  if (!ctx) return { url: null };
  try {
    // Read current logs
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

    // Append new log line
    const line = `[${new Date().toISOString()}] ${ctx}\n`;
    const newContent = currentContent + line;

    const result = await put(BLOB_KEY, newContent, {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    console.log("Blob written at URL:", result.url);
    return { url: result.url };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Failed to write to blob:", msg);
    return { url: null, error: msg };
  }
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const ctx = url.searchParams.get("ctx");

  const { url: blobUrl, error } = await logCtx(ctx);

  return Response.json({ pong: true, ctx: ctx ?? null, blobUrl, error });
}

export async function action({ request }: Route.ActionArgs) {
  const body = await request.json();
  const ctx = body?.ctx ?? null;

  const { url: blobUrl, error } = await logCtx(ctx);

  return Response.json({ pong: true, ctx, blobUrl, error });
}

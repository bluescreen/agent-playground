import { put, getDownloadUrl } from "@vercel/blob";
import type { Route } from "../../.react-router/types/src/routes/+types.ping";

const BLOB_KEY = "ctx.log";

async function logCtx(ctx: string | null): Promise<string | null> {
  if (!ctx) return null;
  try {
    // Read current logs
    let currentContent = "";
    try {
      const downloadUrl = await getDownloadUrl(BLOB_KEY);
      const response = await fetch(downloadUrl, {
        headers: {
          Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
        },
      });
      if (response.ok) {
        currentContent = await response.text();
      }
    } catch (error) {
      // First write or blob doesn't exist yet
    }

    // Append new log line
    const line = `[${new Date().toISOString()}] ${ctx}\n`;
    const newContent = currentContent + line;

    const result = await put(BLOB_KEY, newContent, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    console.log("Blob written at URL:", result.url);
    return result.url;
  } catch (error) {
    console.error("Failed to write to blob:", error);
    return null;
  }
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const ctx = url.searchParams.get("ctx");

  const blobUrl = await logCtx(ctx);

  return Response.json({ pong: true, ctx: ctx ?? null, blobUrl });
}

export async function action({ request }: Route.ActionArgs) {
  const body = await request.json();
  const ctx = body?.ctx ?? null;

  const blobUrl = await logCtx(ctx);

  return Response.json({ pong: true, ctx, blobUrl });
}

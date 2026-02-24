import { put, getDownloadUrl } from "@vercel/blob";
import type { Route } from "../../.react-router/types/src/routes/+types.ping";

const BLOB_KEY = "ctx.log";

async function logCtx(ctx: string | null) {
  if (!ctx) return;
  try {
    // Read current logs
    let currentContent = "";
    try {
      const downloadUrl = await getDownloadUrl(BLOB_KEY);
      const response = await fetch(downloadUrl);
      if (response.ok) {
        currentContent = await response.text();
      }
    } catch (error) {
      // First write or blob doesn't exist yet
      console.log("No existing blob found, starting fresh");
    }

    // Append new log line
    const line = `[${new Date().toISOString()}] ${ctx}\n`;
    const newContent = currentContent + line;

    // Write to blob (private)
    await put(BLOB_KEY, newContent, {
      access: "private",
    });
  } catch (error) {
    console.error("Failed to write to blob:", error);
  }
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const ctx = url.searchParams.get("ctx");

  await logCtx(ctx);

  return Response.json({ pong: true, ctx: ctx ?? null });
}

export async function action({ request }: Route.ActionArgs) {
  const body = await request.json();
  const ctx = body?.ctx ?? null;

  await logCtx(ctx);

  return Response.json({ pong: true, ctx });
}

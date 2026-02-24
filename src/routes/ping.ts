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
      console.log("Download URL:", downloadUrl);
      const response = await fetch(downloadUrl, {
        headers: {
          Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
        },
      });
      if (response.ok) {
        currentContent = await response.text();
        console.log("Read existing content, length:", currentContent.length);
      } else {
        console.log("No existing blob, starting fresh");
      }
    } catch (error) {
      console.log("Error reading blob:", error);
    }

    // Append new log line
    const line = `[${new Date().toISOString()}] ${ctx}\n`;
    const newContent = currentContent + line;

    // Write to blob (public for easier reading)
    const result = await put(BLOB_KEY, newContent, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    console.log("Blob written:", result);
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

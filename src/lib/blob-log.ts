import { put } from "@vercel/blob";

const BLOB_KEY = "ctx.log";

function getBlobUrl(): string {
  const token = process.env.BLOB_READ_WRITE_TOKEN ?? "";
  // Token format: vercel_blob_rw_<STOREID>_<secret>
  const storeId = token.split("_")[3]?.toLowerCase() ?? "";
  return `https://${storeId}.private.blob.vercel-storage.com/${BLOB_KEY}`;
}

async function readBlob(): Promise<string> {
  const response = await fetch(getBlobUrl(), {
    headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
  });
  if (response.ok) return response.text();
  return "";
}

export async function appendLog(ctx: string): Promise<void> {
  try {
    const currentContent = await readBlob();
    const line = `[${new Date().toISOString()}] ${ctx}\n`;
    await put(BLOB_KEY, currentContent + line, {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
  } catch (error) {
    console.error("Failed to write log:", error);
  }
}

export async function readLogs(): Promise<{ timestamp: string; message: string }[]> {
  try {
    const content = await readBlob();
    return content
      .split("\n")
      .filter((line) => line.trim())
      .map((line) => {
        const match = line.match(/^\[(.*?)\]\s(.*)$/);
        return { timestamp: match?.[1] ?? "", message: match?.[2] ?? line };
      })
      .reverse();
  } catch (error) {
    console.error("Failed to read logs:", error);
    return [];
  }
}

import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { db } from "$lib/server/db";
import { file } from "$lib/server/db/schema";
import { and, eq } from "drizzle-orm";
import { getObjectBytes, objectExists, putObjectBytes } from "$lib/server/r2";
import sharp from "sharp";

const ALLOWED_WIDTHS = [200, 300, 400, 800];

const derivedKeyFor = (f: typeof file.$inferSelect, width: number) =>
  `derived/${f.id}/${f.updatedAt?.getTime()}/${width}.webp`;

const resizeToWebp = (input: Buffer, width: number) =>
  sharp(input)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 75 })
    .toBuffer();

async function getOwnedFile(fileId: string, userId: string) {
  const [row] = await db
    .select()
    .from(file)
    .where(and(eq(file.id, fileId), eq(file.userId, userId)));
  if (!row) throw error(404, "Not found");
  return row;
}

export const GET: RequestHandler = async ({ params, locals, url }) => {
  const user = locals.user;

  if (!user) throw error(401, "Unauthorized");

  const width = Number(url.searchParams.get("w")) || 400;

  if (!ALLOWED_WIDTHS.includes(width)) throw error(400, "Invalid width");

  const fileData = await getOwnedFile(params.fileId, user.id);
  const derivedKey = derivedKeyFor(fileData, width);

  if (!(await objectExists(derivedKey))) {
    // Only images can be resized on demand. Anything else (e.g. a video) gets its
    // thumbnail from the browser via POST, so a miss here means "no thumbnail yet".
    if (fileData.type !== "image") throw error(404, "Thumbnail not available");

    const original = await getObjectBytes(fileData.key);
    await putObjectBytes(derivedKey, await resizeToWebp(original, width), "image/webp");
  }

  const bytes = await getObjectBytes(derivedKey);

  return new Response(bytes, {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "private, max-age=86400"
    }
  });
};

// Videos can't be decoded by sharp, so the browser grabs a frame and uploads it
// here. We store every allowed width so GET works for whichever size the UI asks for.
export const POST: RequestHandler = async ({ params, locals, request }) => {
  const user = locals.user;

  if (!user) throw error(401, "Unauthorized");

  const fileData = await getOwnedFile(params.fileId, user.id);

  const frame = Buffer.from(await request.arrayBuffer());

  if (!frame.length) throw error(400, "Empty body");

  try {
    await Promise.all(
      ALLOWED_WIDTHS.map(async (width) =>
        putObjectBytes(derivedKeyFor(fileData, width), await resizeToWebp(frame, width), "image/webp")
      )
    );
  } catch (err) {
    console.error("Thumbnail generation failed", err);
    throw error(400, "Invalid image");
  }

  return new Response(null, { status: 204 });
};

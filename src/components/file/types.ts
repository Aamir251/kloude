// ── Category enum ─────────────────────────────────────────────────────────────
// This is the stable set of UI categories. Many formats map to one category
// (mp4/mov/avi/mkv → video). This is what gets stored in the DB and drives

import type { file } from '$lib/server/db/schema';

// icons, colours, and filters.
export type FileKind =
	| 'image' // jpg, png, gif, webp, svg, heic, avif…
	| 'video' // mp4, mov, avi, mkv, webm…
	| 'audio' // mp3, wav, flac, aac, ogg…
	| 'pdf' // pdf (common enough to stand alone)
	| 'doc' // docx, doc, txt, md, rtf…
	| 'sheet' // xlsx, xls, csv, ods…
	| 'presentation' // pptx, ppt, key, odp…
	| 'archive' // zip, rar, tar, gz, 7z…
	| 'figma' // fig (no standard MIME type — detected by extension)
	| 'code' // js, ts, py, go, json, html, css…
	| 'other'; // anything that doesn't match above

export const fileLabels: Record<FileKind, string> = {
	image: 'IMG',
	video: 'VID',
	audio: 'AUD',
	pdf: 'PDF',
	doc: 'DOC',
	sheet: 'XLS',
	presentation: 'PPT',
	archive: 'ZIP',
	figma: 'FIG',
	code: 'CODE',
	other: 'FILE'
};

export type FileType = typeof file.$inferSelect & {
	// Short-lived signed R2 GET URL, only populated for image-kind files.
	url?: string;
};

import type { FileKind } from './types';

export const fileIcons: Record<FileKind, string> = {
	image: `<rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M21 15l-5-5L5 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,

	video: `<polygon points="23 7 16 12 23 17 23 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="1" y="5" width="15" height="14" rx="2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,

	audio: `<path d="M9 18V5l12-2v13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="6" cy="18" r="3" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="16" r="3" stroke="currentColor" stroke-width="1.5"/>`,

	pdf: `<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 2v6h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 13h6M9 17h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,

	doc: `<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 2v6h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 13h6M9 17h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,

	sheet: `<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 2v6h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 13h8M8 17h8M8 9h2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,

	presentation: `<rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 21h8M12 17v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,

	archive: `<path d="M21 10H3M21 10V19a2 2 0 01-2 2H5a2 2 0 01-2-2V10M21 10l-2-7H5L3 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 14v4M10 16h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,

	figma: `<path d="M5 5.5A3.5 3.5 0 018.5 2H12v7H8.5A3.5 3.5 0 015 5.5z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 2h3.5a3.5 3.5 0 110 7H12V2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 12.5a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 12.5A3.5 3.5 0 018.5 9H12v7H8.5A3.5 3.5 0 015 12.5z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 19.5A3.5 3.5 0 018.5 16H12v3.5a3.5 3.5 0 01-7 0z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,

	code: `<polyline points="16 18 22 12 16 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><polyline points="8 6 2 12 8 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,

	other: `<path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 2v7h7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`
};

// ── MIME-type → FileKind mapping ──────────────────────────────────────────────
// Used at upload time. Covers the most common MIME types; the prefix fast-path
// handles the long tail of image/*, video/*, audio/*.
const MIME_TO_KIND: Record<string, FileKind> = {
	// PDF
	'application/pdf': 'pdf',

	// Documents
	'application/msword': 'doc',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'doc',
	'text/plain': 'doc',
	'text/markdown': 'doc',
	'application/rtf': 'doc',

	// Sheets
	'application/vnd.ms-excel': 'sheet',
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'sheet',
	'text/csv': 'sheet',
	'application/vnd.oasis.opendocument.spreadsheet': 'sheet',

	// Presentations
	'application/vnd.ms-powerpoint': 'presentation',
	'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'presentation',
	'application/vnd.apple.keynote': 'presentation',
	'application/vnd.oasis.opendocument.presentation': 'presentation',

	// Archives
	'application/zip': 'archive',
	'application/x-zip-compressed': 'archive',
	'application/x-rar-compressed': 'archive',
	'application/vnd.rar': 'archive',
	'application/x-tar': 'archive',
	'application/gzip': 'archive',
	'application/x-7z-compressed': 'archive',
	'application/x-bzip2': 'archive',

	// Code
	'text/javascript': 'code',
	'application/javascript': 'code',
	'text/typescript': 'code',
	'text/html': 'code',
	'text/css': 'code',
	'application/json': 'code',
	'application/xml': 'code',
	'text/xml': 'code',
	'text/x-python': 'code',
	'text/x-rust': 'code',
	'text/x-go': 'code'
};

// Extension fallback — for types with no reliable/standard MIME type.
const EXT_TO_KIND: Record<string, FileKind> = {
	fig: 'figma',
	// code extensions browsers often send as text/plain
	js: 'code',
	ts: 'code',
	jsx: 'code',
	tsx: 'code',
	py: 'code',
	go: 'code',
	rs: 'code',
	rb: 'code',
	java: 'code',
	cpp: 'code',
	c: 'code',
	cs: 'code',
	php: 'code',
	swift: 'code',
	kt: 'code',
	// archive extensions sometimes sent without MIME
	rar: 'archive',
	'7z': 'archive',
	tar: 'archive',
	gz: 'archive',
	bz2: 'archive'
};

/**
 * Detect the FileKind for a file being uploaded.
 * Works in the browser (pass the `File` object) or server-side (pass any
 * object with `type` and `name` strings, e.g. from a multipart upload).
 *
 * Strategy:
 *  1. MIME prefix fast-path  → image/*, video/*, audio/*
 *  2. Full MIME lookup       → specific application/* and text/* types
 *  3. File extension fallback → for .fig, bare code files, etc.
 *  4. 'other'                → anything unrecognised
 */
export function getFileKind(file: { type: string; name: string }): FileKind {
	const mime = file.type.toLowerCase();
	const [prefix] = mime.split('/');

	if (prefix === 'image') return 'image';
	if (prefix === 'video') return 'video';
	if (prefix === 'audio') return 'audio';

	const fromMime = MIME_TO_KIND[mime];
	if (fromMime) return fromMime;

	const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
	return EXT_TO_KIND[ext] ?? 'other';
}

// ── Byte formatting ───────────────────────────────────────────────────────────
export function formatBytes(bytes: number): string {
	if (bytes <= 0) return '0 B';
	const units = ['B', 'KB', 'MB', 'GB', 'TB'];
	const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
	const value = bytes / 1024 ** i;
	return `${i === 0 ? value : value.toFixed(1)} ${units[i]}`;
}

// // ── FileType (UI model) ───────────────────────────────────────────────────────
// export type FileType = {
// 	id: string;
// 	name: string;
// 	kind: FileKind;
// 	mimeType: string;   // original MIME string, e.g. "video/mp4"
// 	size: string;       // human-readable display string, e.g. "340 MB"
// 	sizeBytes: number;  // raw bytes for sorting
// 	modified: string;   // relative time for display, e.g. "3 hrs ago"
// 	modifiedTs: number; // unix timestamp for sorting
// 	starred: boolean;
// 	shared: boolean;
// 	thumbnail?: string; // signed URL for image/video preview thumbnails
// };

// ── Display maps ──────────────────────────────────────────────────────────────
export const fileColors: Record<FileKind | 'default', string> = {
	image: '#10b981', // emerald
	video: '#8b5cf6', // violet
	audio: '#ec4899', // rose
	pdf: '#ef4444', // red
	doc: '#6366f1', // indigo
	sheet: '#22c55e', // green
	presentation: '#f59e0b', // amber
	archive: '#f97316', // orange
	figma: '#06b6d4', // cyan
	code: '#84cc16', // lime
	other: '#6b7280', // gray
	default: '#6366f1'
};

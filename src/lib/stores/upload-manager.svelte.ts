import { invalidateAll } from '$app/navigation';
import { getVideoThumbnailImage, isFileOfVideoType } from '$lib/helpers/file';

export type UploadStatus = 'uploading' | 'done' | 'error' | 'canceled';

export type UploadItem = {
	id: string;
	name: string;
	size: number;
	type: string;
	progress: number;
	status: UploadStatus;
	errorMsg?: string;
	xhr?: XMLHttpRequest;
};

// Svelte won't let a module export a $state binding that gets reassigned —
// only its properties may be mutated from outside. So the exported value is
// one object, and every update below assigns to a property of it (`upload.isOpen = …`,
// `upload.items = […]`) rather than rebinding the export itself.
export const upload = $state({
	isOpen: false,
	items: [] as UploadItem[]
});

export function openUploadDialog() {
	upload.isOpen = true;
}

export function closeUploadDialog() {
	upload.isOpen = false;
}

export function addUploadFiles(files: FileList | File[], folderId?: string) {
	upload.isOpen = true;
	for (const file of Array.from(files)) {
		uploadFile(file, folderId);
	}
}

export function cancelUpload(id: string) {
	upload.items.find((item) => item.id === id)?.xhr?.abort();
}

export function removeUpload(id: string) {
	upload.items = upload.items.filter((item) => item.id !== id);
}

export function clearCompletedUploads() {
	upload.items = upload.items.filter((item) => item.status === 'uploading');
}

async function uploadFile(file: File, folderId?: string) {
	// Created with $state() (not a plain object literal) so this reference IS
	// the reactive proxy — later field writes below notify subscribers directly,
	// instead of silently mutating a snapshot that Svelte never sees.
	const item = $state<UploadItem>({
		id: crypto.randomUUID(),
		name: file.name,
		size: file.size,
		type: file.type,
		progress: 0,
		status: 'uploading'
	});
	upload.items = [item, ...upload.items];

	try {
		const presignRes = await fetch('/api/upload', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name: file.name, size: file.size, type: file.type, folderId })
		});

		if (!presignRes.ok) {
			const body = await presignRes.json().catch(() => null);
			throw new Error(body?.message ?? 'Could not start upload');
		}

		const { uploadUrl, key } = await presignRes.json();

		await new Promise<void>((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			item.xhr = xhr;

			xhr.upload.addEventListener('progress', (e) => {
				if (e.lengthComputable) item.progress = Math.round((e.loaded / e.total) * 100);
			});

			xhr.addEventListener('load', () => {
				if (xhr.status >= 200 && xhr.status < 300) resolve();
				else reject(new Error(`Upload failed (${xhr.status})`));
			});

			xhr.addEventListener('error', () => reject(new Error('Network error during upload')));
			xhr.addEventListener('abort', () => reject(new Error('canceled')));

			xhr.open('PUT', uploadUrl);
			xhr.setRequestHeader('Content-Type', file.type || 'application/octet-stream');
			xhr.send(file);
		});

		const completeRes = await fetch('/api/upload/complete', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ key, name: file.name, size: file.size, type: file.type, folderId })
		});

    if (!completeRes.ok) throw new Error('Could not finalize upload');

    const isVideo = isFileOfVideoType(file);
    // generate thumbnail for video files and store them;
    if (isVideo) {
      const thumbnail = await getVideoThumbnailImage(file);
      const { file: insertedFile } = await completeRes.json();

      // Resizing/storing happens server-side; the browser only extracts the frame.
      await fetch(`/api/files/${insertedFile.id}/thumbnail`, {
        method: 'POST',
        headers: { 'Content-Type': 'image/jpeg' },
        body: thumbnail
      });
    }

		item.progress = 100;
		item.status = 'done';
		await invalidateAll();
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Upload failed';
		item.status = message === 'canceled' ? 'canceled' : 'error';
		item.errorMsg = message === 'canceled' ? undefined : message;
	}
}

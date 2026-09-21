import { error, json } from '@sveltejs/kit';
import { HeadObjectCommand } from '@aws-sdk/client-s3';
import { r2, R2_BUCKET_NAME } from '$lib/server/r2';
import { db } from '$lib/server/db';
import { file } from '$lib/server/db/schema';
import { getFileKind, formatBytes } from '$components/file/constants';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
	const user = await locals.user;
	if (!user?.id) error(401, 'Unauthorized');

	const { key, name, size, type, folderId } = await request.json();

	if (typeof key !== 'string' || !key.startsWith(`${user.id}/`)) error(403, 'Invalid file key');
	if (typeof name !== 'string' || !name.trim()) error(400, 'Missing file name');
	if (typeof size !== 'number' || size <= 0) error(400, 'Invalid file size');

	try {
		await r2.send(new HeadObjectCommand({ Bucket: R2_BUCKET_NAME, Key: key }));
	} catch {
		error(404, 'Upload did not complete — object not found in storage');
	}

	const [inserted] = await db
		.insert(file)
		.values({
			name,
			userId: user.id,
			key,
			size: formatBytes(size),
			sizeBytes: size,
			type: getFileKind({ type: typeof type === 'string' ? type : '', name }),
			folderId: typeof folderId === 'string' ? folderId : null
		})
		.returning();

	return json({ file: inserted });
};

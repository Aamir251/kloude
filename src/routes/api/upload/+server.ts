import { error, json } from '@sveltejs/kit';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { r2, R2_BUCKET_NAME } from '$lib/server/r2';
import type { RequestHandler } from './$types';

const MAX_UPLOAD_BYTES = 5 * 1024 ** 3; // 5 GiB — R2 single PUT limit

export const POST: RequestHandler = async ({ request, locals }) => {
	const user = await locals.user;
	if (!user?.id) error(401, 'Unauthorized');

	const { name, size, type, folderId } = await request.json();

	if (typeof name !== 'string' || !name.trim()) error(400, 'Missing file name');
	if (typeof size !== 'number' || size <= 0) error(400, 'Invalid file size');
	if (size > MAX_UPLOAD_BYTES) error(413, 'File exceeds the 5 GB upload limit');

	const safeName = name.replace(/[^a-zA-Z0-9._-]/g, '_');
	const key = `${user.id}/${crypto.randomUUID()}-${safeName}`;

	const uploadUrl = await getSignedUrl(
		r2,
		new PutObjectCommand({
			Bucket: R2_BUCKET_NAME,
			Key: key,
			ContentType: typeof type === 'string' && type ? type : 'application/octet-stream',
			ContentLength: size
		}),
		{ expiresIn: 60 * 15 }
	);

	return json({ uploadUrl, key, folderId: folderId ?? null });
};

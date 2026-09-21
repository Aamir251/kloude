import { eq } from 'drizzle-orm';
import { db } from '../db';
import { file } from '../db/schema';

export const getFiles = async (userId: string, folderId?: string) => {
	const rows = await db.select().from(file).where(eq(file.userId, userId));

	return rows.map((row) =>
		row.type === 'image' || row.type === "video" ? { ...row, url: `/api/files/${row.id}/thumbnail?w=300` } : row
	);
};

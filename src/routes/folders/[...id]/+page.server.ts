import { getFiles } from '@/server/database/file';
import { getFolders } from '@/server/database/folder';

export const load = async ({ params : { id }, locals : { session } }) => {
	
	return {
		folders: getFolders(session?.user.id!, id),
		files: getFiles(session?.user.id!, id)
	}
	
};
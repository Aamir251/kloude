import { getFiles } from '$lib/server/db-utils/file';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const user = await locals.user;

	if (!user?.id) {
		redirect(302, '/login');
	}

	const resp = await getFiles(user.id);

	return {
		files: resp
	};
};

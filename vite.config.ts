import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		// my-server.js (run separately, see package.json "start") serves optimized
		// images at /_ipx — proxy it through so <Image> works under `vite dev` too.
		proxy: {
			'/_ipx': `http://localhost:${process.env.IPX_PORT ?? 3001}`
		}
	}
});

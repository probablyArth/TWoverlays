import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			out: '../build',
			precompress: false,
			envPrefix: ''
		}),
		csp: {
			directives: {
				'script-src': ['self', 'unsafe-inline']
			}
		}
	}
};
export default config;

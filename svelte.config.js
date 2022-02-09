import vercel from '@sveltejs/adapter-vercel'
import preprocess from 'svelte-preprocess'
import { optimizeImports, optimizeCss } from 'carbon-preprocess-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess.typescript(),
		preprocess.sass(),
		preprocess.globalStyle(),
		preprocess.replace(),
		optimizeImports()
	],

	kit: {
		adapter: vercel(),

		vite: {
			plugins: [process.env.NODE_ENV === 'production' && optimizeCss()]
		}
	}
}

export default config

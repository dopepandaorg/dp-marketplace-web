import vercel from '@sveltejs/adapter-vercel'
import preprocess from 'svelte-preprocess'
import { optimizeImports, optimizeCss } from 'carbon-preprocess-svelte'
import inject from '@rollup/plugin-inject'
import svg from '@poppanator/sveltekit-svg'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess.typescript(),
		preprocess.sass(),
		preprocess.globalStyle(),
		preprocess.replace(),
		optimizeImports(),
		process.env.NODE_ENV === 'production' && optimizeCss()
	],

	kit: {
		adapter: vercel(),

		vite: {
			resolve: {
				alias: {
					path: 'path-browserify',
					buffer: 'buffer'
				}
			},
			build: {
				transformMixedEsModules: true,
				rollupOptions: {
					plugins: [
						inject({ Buffer: ['buffer', 'Buffer'] }),
					]
				}
			},
			optimizeDeps: {
				exclude: ['subscriptions-transport-ws'],
				esbuildOptions: {
					define: {
						global: 'globalThis'
					}
				}
			},
			plugins: [
				inject({ Buffer: ['buffer', 'Buffer'] }),
				svg({})
			]
		}
	}
}

export default config

import vercel from '@sveltejs/adapter-vercel'
import preprocess from 'svelte-preprocess'
import { optimizeImports, optimizeCss } from 'carbon-preprocess-svelte'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'
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
					Buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6'
				}
			},
			build: {
				transformMixedEsModules: true,
				rollupOptions: {
					plugins: [rollupNodePolyFill()]
				}
			},
			optimizeDeps: {
				exclude: ['subscriptions-transport-ws'],
				esbuildOptions: {
					define: {
						global: 'globalThis'
					},
					// Enable esbuild polyfill plugins
					plugins: [
						NodeGlobalsPolyfillPlugin({
							buffer: true
						})
					]
				}
			},
			plugins: [svg({})]
		}
	}
}

export default config

/**
 * Can be made globally available by placing this
 * inside `global.d.ts` and removing `export` keyword
 */

interface ImportMetaEnv {
	NETWORK_ENV: string
	HASURA_CLIENT_URI: string
	WEB3_STORAGE_TOKEN: string
	PURESTAKE_API_KEY: string
}

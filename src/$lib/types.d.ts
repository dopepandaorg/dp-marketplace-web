/**
 * Can be made globally available by placing this
 * inside `global.d.ts` and removing `export` keyword
 */

interface ImportMetaEnv {
	HASURA_CLIENT_URI: string
	WEB3_STORAGE_TOKEN: string
}

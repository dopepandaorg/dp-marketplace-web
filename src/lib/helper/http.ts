import { ALGO_EXPLORER_FETCH_OPTIONS } from '$lib/constants/api'

/**
 * Helper function to parse and typecast API functions
 *
 * @param url
 * @returns a typecasted promise
 */
export function api<T>(url: string): Promise<T> {
	return fetch(url).then((response) => {
		if (!response.ok) {
			throw new Error(response.statusText)
		}
		return response.json() as Promise<T>
	})
}

/**
 * Helper function to parse and typecast API functions for indexer functions
 *
 * @param url
 * @returns a typecasted promise
 */
export function indexerApi<T>(url: string): Promise<T> {
	return fetch(url, { ...ALGO_EXPLORER_FETCH_OPTIONS }).then((response) => {
		if (!response.ok) {
			throw new Error(response.statusText)
		}
		return response.json() as Promise<T>
	})
}

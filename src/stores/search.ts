import { LoadingStatus } from '../$lib/constants/enums'
import type { SearchResponse } from '../$lib/interfaces/search'
import { get, writable } from 'svelte/store'

/**
 * Initialize the search
 */
export const search = writable<SearchResponse>({
	q: '',
	status: LoadingStatus.NONE,
	results: []
})

/**
 * Helper action to fetch search
 */
export const doSearch = (q: string) => {
	if (q && q.length > 0) {
		search.update((search) => ({ ...search, q, status: LoadingStatus.IN_PROGRESS }))

		fetch(`/search/${q}.json`)
			.then((response) => response.json())
			.then((body) =>
				search.update((search) => ({ ...search, q, results: [], status: LoadingStatus.SUCCESS }))
			)
	}
}

/**
 * Helper action to fetch search in succession
 */
export const doSearchNew = (q: string) => {
	const $search = get(search)
	if ($search.status !== LoadingStatus.IN_PROGRESS) {
		doSearch(q)
	}
}

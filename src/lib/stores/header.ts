import { writable } from 'svelte/store'

/**
 * Header
 */
export const isHeaderOpen = writable<boolean>(false)

/**
 * Helper action handle header open status
 */
export const headerMenuExit = () => {
	isHeaderOpen.set(false)
}

/**
 * Helper action handle header open status
 */
export const headerMenuEnter = () => {
	isHeaderOpen.set(true)
}

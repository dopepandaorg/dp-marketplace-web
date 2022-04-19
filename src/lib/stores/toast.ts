import { writable } from 'svelte/store'
import type { ToastRecord } from '$lib/interfaces/toast'

const defaultRecord = {
	kind: 'info',
	dismissible: true,
	timeout: 3000
}

export const toasts = writable<ToastRecord[]>([])

export const addToast = (toast: ToastRecord) => {
	const id = Math.floor(Math.random() * 10000)

	// Push the toast to the top of the list of toasts
	const t = { ...defaultRecord, id, ...toast }
	toasts.update((all) => [t, ...all])

	// If toast is dismissible, dismiss it after "timeout" amount of time.
	if (t.timeout) setTimeout(() => dismissToast(id), t.timeout)
}

export const dismissToast = (id: number) => {
	toasts.update((all) => all.filter((t) => t.id !== id))
}

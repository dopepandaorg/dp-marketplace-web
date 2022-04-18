import { get } from 'svelte/store'
import { wallet } from '../../stores/wallet'

const isClient = typeof window !== 'undefined'
const protectedRoutes = ['/profile']

export function authGuard({ url }): any {
	const w = get(wallet)
	let isRouteProtected = false

	if (!isClient) {
		return {}
	}

	protectedRoutes.map((p: string) => {
		if (url.pathname.indexOf(p) !== -1) {
			isRouteProtected = true
		}
	})

	if (!w.isConnected && isRouteProtected) {
		return { status: 302, redirect: '/' }
	}

	return {}
}

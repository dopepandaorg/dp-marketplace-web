import { wallet } from './wallet'
import { writable, get } from 'svelte/store'
import { LoadingStatus } from '$lib/constants/enums'

/**
 * Initialize the wallet store
 */
interface AssetsStore {
	status: LoadingStatus
	created: any[]
	opted: any[]
}
export const assets = writable<AssetsStore>({
	status: LoadingStatus.NONE,
	created: [],
	opted: []
})

/**
 * Helper action to fetch a user's wallet assets
 */
export const syncWalletAssets = () => {
	const $wallet = get(wallet)

	if ($wallet.isConnected) {
		assets.update((a) => ({ ...a, status: LoadingStatus.IN_PROGRESS }))

		fetch(`/api/wallet/${$wallet.account}/assets.json`)
			.then((response) => response.json())
			.then((body) => assets.update(() => ({ ...body, status: LoadingStatus.SUCCESS })))
			.catch(() => assets.update((a) => ({ ...a, status: LoadingStatus.ERROR })))
	}
}

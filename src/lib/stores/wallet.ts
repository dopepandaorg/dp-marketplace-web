import { WalletStatus, WalletType } from '$lib/interfaces/wallet'
import { writable, get } from 'svelte/store'
import { browser } from '$app/env'

/**
 * Initialize the wallet store
 */
export const wallet = writable({
	type: ((browser && localStorage.getItem('wallet-type')) || null) as WalletType,
	account: (browser && localStorage.getItem('wallet-account')) || null,
	isConnected: browser && !!localStorage.getItem('wallet-account'),
	status: WalletStatus.NONE as WalletStatus,
	assets: [],
	totalAlgo: 0,
	totalDPANDA: 0,
	totalDPANDALp: 0,
	dpandaTier: 0,
	dpandaLPFactor: 0
})

/**
 * Handle local storage subscription
 */
wallet.subscribe((wallet) => {
	if (wallet.type) {
		browser && localStorage.setItem('wallet-type', wallet.type)
	}

	if (wallet.account) {
		browser && localStorage.setItem('wallet-account', wallet.account)
	}
})

/**
 * Helper function to set new wallet data
 *
 * @param type Type of wallet
 * @param account The selected account address
 */
export const setWalletData = (type: WalletType, account: string) => {
	wallet.update((wallet) => ({
		...wallet,
		type,
		isConnected: !!account,
		account
	}))
}

/**
 * Helper function to clear wallet data
 */
export const clearWalletData = () => {
	wallet.update((wallet) => ({
		...wallet,
		status: WalletStatus.NONE,
		type: null,
		isConnected: false,
		account: null,
		assets: [],
		totalAlgo: 0,
		totalDPANDA: 0,
		totalDPANDALp: 0,
		dpandaTier: 0,
		dpandaLPFactor: 0
	}))

	browser && localStorage.removeItem('wallet-type')
	browser && localStorage.removeItem('wallet-account')
}

/**
 * Helper action to fetch a user's wallet assets
 */
export const syncWalletAssets = () => {
	const $wallet = get(wallet)

	if ($wallet.isConnected) {
		wallet.update((wallet) => ({
			...wallet,
			status: WalletStatus.CONNECTING
		}))

		fetch(`/api/wallet/${$wallet.account}.json`)
			.then((response) => response.json())
			.then((body) =>
				wallet.update((wallet) => ({
					...wallet,
					...body,
					status: WalletStatus.CONNECTED,
					assets: body.assets,
					dpandaTier: body.dpandaTier
				}))
			)
	}
}

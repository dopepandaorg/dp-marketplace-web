import type { WalletType } from 'src/$lib/interfaces/wallet'
import { writable } from 'svelte/store'

/**
 * Initialize the wallet store
 */
export const wallet = writable({
	type: localStorage.getItem('wallet-type') || null,
	account: localStorage.getItem('wallet-account') || null,
	isConnected: !!localStorage.getItem('wallet-account')
})

/**
 * Handle local storage subscription
 */
wallet.subscribe((wallet) => {
	if (wallet.type) {
		localStorage.setItem('wallet-type', wallet.type)
	} else {
		localStorage.removeItem('wallet-type')
	}

	if (wallet.account) {
		localStorage.setItem('wallet-account', wallet.account)
	} else {
		localStorage.removeItem('wallet-account')
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
		type: null,
		isConnected: false,
		account: null
	}))
}
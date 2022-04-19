import type { ToastRecord } from '$lib/interfaces/toast'

export const N_WALLET_DISCONNECT: ToastRecord = {
	kind: 'info',
	title: 'Wallet Disconnected'
}

export const N_ERROR_CREATE_TXN: ToastRecord = {
	kind: 'error',
	title: 'Error in creating transaction'
}

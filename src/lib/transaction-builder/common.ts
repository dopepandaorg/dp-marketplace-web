import type { Transaction } from 'algosdk'
import { algoSubmitTransaction } from '$lib/helper/algoClient'
import { SignedTxn, WalletType } from '$lib/interfaces/wallet'
import { addToast } from '$lib/stores/toast'
import { N_ERROR_CREATE_TXN } from '$lib/constants/notifications'
import { onMyalgoSignTx, onMyalgoSignTxMultiple, onPeraSignTx, onPeraSignTxMultiple } from '$lib/helper/walletConnect'

export const signTransaction = async (
	walletType: WalletType,
	txn: Transaction,
	description: string
): Promise<SignedTxn> => {
	let signedTxn: SignedTxn

	try {
		// Build transaction object
		switch (walletType) {
			case WalletType.MYALGO:
				signedTxn = await onMyalgoSignTx(txn)
				break
			case WalletType.PERA:
				signedTxn = await onPeraSignTx(txn, description)
				break
		}
	} catch (error) {
		// Display error notification
		addToast(N_ERROR_CREATE_TXN)
		console.error(error)
		throw new Error(error)
	}

	return signedTxn
}

export const signTransactions = async (
	walletType: WalletType,
	txns: Transaction[],
	description: string
): Promise<SignedTxn[]> => {
	let signedTxns: SignedTxn[]

	try {
		// Build transaction object
		switch (walletType) {
			case WalletType.MYALGO:
				signedTxns = await onMyalgoSignTxMultiple(txns)
				break
			case WalletType.PERA:
				signedTxns = await onPeraSignTxMultiple(txns, description)
				break
		}
	} catch (error) {
		// Display error notification
		addToast(N_ERROR_CREATE_TXN)
		console.error(error)
		throw new Error(error)
	}

	return signedTxns
}

export const submitTransaction = async (
	signedTxn: SignedTxn | SignedTxn[]
): Promise<{ txId: string; txInfo: any; confirmedRound: number }> => {
	let txId: string
	let txInfo: any
	let confirmedRound: number

	try {
		const myAlgoTxSubmit = await algoSubmitTransaction(signedTxn)
		txId = myAlgoTxSubmit.txId
		confirmedRound = myAlgoTxSubmit.confirmedRound
		txInfo = myAlgoTxSubmit.txInfo

		if (!txId) {
			throw new Error('Unable to generate transaction ID')
		}
	} catch (error) {
		// Display error notification
		addToast(N_ERROR_CREATE_TXN)
		console.error(error)
		throw new Error(error)
	}

	return { txId, txInfo, confirmedRound }
}

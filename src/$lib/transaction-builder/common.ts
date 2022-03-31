import type { Transaction } from 'algosdk'
import { algoSubmitTransaction, getAlgoClient } from '../helper/algoClient'
import { SignedTxn, WalletType } from '../interfaces/wallet'
import { addToast } from '../../stores/toast'
import { N_ERROR_CREATE_TXN } from '../constants/notifications'
import { onMyalgoSignTx, onPeraSignTx } from '../helper/walletConnect'

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
				signedTxn = await executeTransactionASAMyAlgo(txn)
				break
			case WalletType.PERA:
				signedTxn = await executeTransactionASAPera(txn, description)
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

export const submitTransaction = async (
	signedTxn: SignedTxn
): Promise<{ txId: string; confirmedRound: number }> => {
	let txId: string
	let confirmedRound: number

	try {
		const myAlgoTxSubmit = await algoSubmitTransaction(signedTxn)
		txId = myAlgoTxSubmit.txId
		confirmedRound = myAlgoTxSubmit.confirmedRound

		if (!txId) {
			throw new Error('Unable to generate transaction ID')
		}
	} catch (error) {
		// Display error notification
		addToast(N_ERROR_CREATE_TXN)
		console.error(error)
		throw new Error(error)
	}

	return { txId, confirmedRound }
}

export const executeTransactionASAMyAlgo = async (txn: Transaction): Promise<SignedTxn> => {
	return onMyalgoSignTx(txn)
}

export const executeTransactionASAPera = (
	txn: Transaction,
	description: string
): Promise<SignedTxn> => {
	return onPeraSignTx(txn, description)
}

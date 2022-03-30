import {
	Transaction,
	SuggestedParams,
	makeAssetCreateTxnWithSuggestedParamsFromObject
} from 'algosdk'
import { algoSubmitTransaction, getAlgoClient } from '../helper/algoClient'
import { SignedTxn, WalletType } from '../interfaces/wallet'
import { addToast } from '../../stores/toast'
import { N_ERROR_CREATE_TXN } from '../constants/notifications'
import type { AssetMetadata } from '../interfaces/asset'
import { onMyalgoSignTx, onPeraSignTx } from '../helper/walletConnect'

export const buildTransactionCreateASA = async (
	walletType: WalletType,
	walletAddress: string,
	assetMetadata: AssetMetadata,
	fractions?: number
): Promise<Transaction> => {
	let txn: Transaction

	try {
		// Load Algorand client
		const algodClient = getAlgoClient()
		const params = await algodClient.getTransactionParams().do()

		// Build transaction object
		txn = buildTransactionCreateASATxn(walletAddress, params, assetMetadata, fractions)
		// let signedTxn: SignedTxn

		// switch (walletType) {
		// 	case WalletType.MYALGO:
		// 		signedTxn = await executeTransactionCreateASAMyAlgo(txn)
		// 		const myAlgoTxSubmit = await algoSubmitTransaction(signedTxn)
		// 		txId = myAlgoTxSubmit.txId
		// 		confirmedRound = myAlgoTxSubmit.confirmedRound
		// 		break
		// 	case WalletType.PERA:
		// 		signedTxn = await executeTransactionCreateASAPera(txn)
		// 		const peraTxSubmit = await algoSubmitTransaction(signedTxn)
		// 		txId = peraTxSubmit.txId
		// 		confirmedRound = peraTxSubmit.confirmedRound
		// 		break
		// }

		// if (!txId) {
		// 	throw new Error('Unable to generate transaction ID')
		// }
	} catch (error) {
		// Display error notification
		addToast(N_ERROR_CREATE_TXN)
		console.error(error)
		throw new Error(error)
	}

	return txn
}

export const signTransactionCreateASA = async (
	walletType: WalletType,
	txn: Transaction
): Promise<SignedTxn> => {
	let signedTxn: SignedTxn

	try {
		// Build transaction object
		switch (walletType) {
			case WalletType.MYALGO:
				signedTxn = await executeTransactionCreateASAMyAlgo(txn)
				break
			case WalletType.PERA:
				signedTxn = await executeTransactionCreateASAPera(txn)
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

export const submitTransactionCreateASA = async (
	signedTxn: SignedTxn
): Promise<{ txId: string; confirmedRound: number }> => {
	let txId: string
	let confirmedRound: number

	try {
		const myAlgoTxSubmit = await algoSubmitTransaction(signedTxn)
		txId = myAlgoTxSubmit.txId
		confirmedRound = myAlgoTxSubmit.confirmedRound

		// if (!txId) {
		// 	throw new Error('Unable to generate transaction ID')
		// }
	} catch (error) {
		// Display error notification
		addToast(N_ERROR_CREATE_TXN)
		console.error(error)
		throw new Error(error)
	}

	return { txId, confirmedRound }
}

// export const buildTransactionCreateASA = async (
// 	walletType: WalletType,
// 	walletAddress: string,
// 	assetMetadata: AssetMetadata,
// 	fractions?: number
// ): Promise<{ txId: string; confirmedRound: number }> => {
// 	let txId: string
// 	let confirmedRound: number

// 	try {
// 		// Load Algorand client
// 		const algodClient = getAlgoClient()
// 		const params = await algodClient.getTransactionParams().do()

// 		// Build transaction object
// 		const txn = buildTransactionCreateASATxn(walletAddress, params, assetMetadata, fractions)
// 		let signedTxn: SignedTxn

// 		switch (walletType) {
// 			case WalletType.MYALGO:
// 				signedTxn = await executeTransactionCreateASAMyAlgo(txn)
// 				const myAlgoTxSubmit = await algoSubmitTransaction(signedTxn)
// 				txId = myAlgoTxSubmit.txId
// 				confirmedRound = myAlgoTxSubmit.confirmedRound
// 				break
// 			case WalletType.PERA:
// 				signedTxn = await executeTransactionCreateASAPera(txn)
// 				const peraTxSubmit = await algoSubmitTransaction(signedTxn)
// 				txId = peraTxSubmit.txId
// 				confirmedRound = peraTxSubmit.confirmedRound
// 				break
// 		}

// 		if (!txId) {
// 			throw new Error('Unable to generate transaction ID')
// 		}
// 	} catch (error) {
// 		// Display error notification
// 		addToast(N_ERROR_CREATE_TXN)
// 		console.error(error)
// 		throw new Error(error)
// 	}

// 	return { txId, confirmedRound }
// }

export const buildTransactionCreateASATxn = (
	from: string,
	suggestedParams: SuggestedParams,
	assetMetadata: AssetMetadata,
	fractions?: number
): Transaction => {
	const txn = makeAssetCreateTxnWithSuggestedParamsFromObject({
		from,
		manager: from,
		reserve: from,
		assetName: assetMetadata.assetName,
		unitName: assetMetadata.unitName,
		assetURL: assetMetadata.assetURL,
		suggestedParams: { ...suggestedParams },
		total: 1,
		decimals: fractions ? fractions : 0,
		defaultFrozen: false
	})

	return txn
}

export const executeTransactionCreateASAMyAlgo = async (txn: Transaction): Promise<SignedTxn> => {
	return onMyalgoSignTx(txn)
}

export const executeTransactionCreateASAPera = (txn: Transaction): Promise<SignedTxn> => {
	return onPeraSignTx(txn)
}

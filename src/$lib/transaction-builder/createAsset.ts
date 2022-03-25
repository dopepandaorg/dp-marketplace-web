import {
	Transaction,
	SuggestedParams,
	makeAssetCreateTxnWithSuggestedParamsFromObject
} from 'algosdk'
import MyAlgoConnect from '@randlabs/myalgo-connect'
import { getAlgoClient } from '../helper/algoClient'
import { SignedTxn, WalletType } from '../interfaces/wallet'
import { addToast } from '../../stores/toast'
import { N_ERROR_CREATE_TXN } from '../constants/notifications'
import type { AssetMetadata } from '../interfaces/asset'

export const buildTransactionCreateASA = async (
	walletType: WalletType,
	walletAddress: string,
	assetMetadata: AssetMetadata,
	fractions?: number
): Promise<string> => {
	let transactionId

	try {
		// Load Algorand client
		const algodClient = getAlgoClient()
		const params = await algodClient.getTransactionParams().do()

		// Build transaction object
		const txn = buildTransactionCreateASATxn(walletAddress, params, assetMetadata, fractions)
		let signedTxn: SignedTxn

		switch (walletType) {
			case WalletType.MYALGO:
				signedTxn = await executeTransactionCreateASAMyAlgo(txn)
				break
			case WalletType.PERA:
				signedTxn = await executeTransactionCreateASAPera(txn)
				break
		}

		if (signedTxn) {
			transactionId = await algodClient.sendRawTransaction(signedTxn.blob).do()
		} else {
			throw new Error()
		}
	} catch (error) {
		// Display error notification
		addToast(N_ERROR_CREATE_TXN)
		throw new Error(error)
	}

	return transactionId
}

export const buildTransactionCreateASATxn = (
	from: string,
	suggestedParams: SuggestedParams,
	assetMetadata: AssetMetadata,
	fractions?: number
): Transaction => {
	const txn = makeAssetCreateTxnWithSuggestedParamsFromObject({
		from,
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
	const myAlgoConnect = new MyAlgoConnect({ bridgeUrl: 'https://dev.myalgo.com/bridge' })
	const signedTxn = await myAlgoConnect.signTransaction(txn.toByte())

	return signedTxn
}

export const executeTransactionCreateASAPera = (txn: Transaction): Promise<SignedTxn> => {
	return null
}

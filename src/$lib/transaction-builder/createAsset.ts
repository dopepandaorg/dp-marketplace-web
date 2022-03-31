import { Transaction, makeAssetCreateTxnWithSuggestedParamsFromObject } from 'algosdk'
import { getAlgoClient } from '../helper/algoClient'
import { addToast } from '../../stores/toast'
import { N_ERROR_CREATE_TXN } from '../constants/notifications'
import type { AssetMetadata } from '../interfaces/asset'

export const buildTransactionCreateASA = async (
	walletAddress: string,
	assetMetadata: AssetMetadata,
	fractions?: number
): Promise<Transaction> => {
	let txn: Transaction

	try {
		// Load Algorand client
		const algodClient = getAlgoClient()
		const params = await algodClient.getTransactionParams().do()

		txn = makeAssetCreateTxnWithSuggestedParamsFromObject({
			from: walletAddress,
			manager: walletAddress,
			reserve: walletAddress,
			assetName: assetMetadata.assetName,
			unitName: assetMetadata.unitName,
			assetURL: assetMetadata.assetURL,
			suggestedParams: { ...params },
			total: 1,
			decimals: fractions ? fractions : 0,
			defaultFrozen: false
		})
	} catch (error) {
		// Display error notification
		addToast(N_ERROR_CREATE_TXN)
		console.error(error)
		throw new Error(error)
	}

	return txn
}

import { Buffer } from 'buffer'
import { Transaction, makePaymentTxnWithSuggestedParamsFromObject } from 'algosdk'
import { getAlgoClient } from '$lib/helper/algoClient'
import { addToast } from '$lib/stores/toast'
import { N_ERROR_CREATE_TXN } from '$lib/constants/notifications'

export const buildTransactionFeaturedGalleryUpdate = async (
	walletAddress: string,
	featuredGallery: number[]
): Promise<Transaction> => {
	let txn: Transaction

	try {
		// Load Algorand client
		const algodClient = getAlgoClient()
		const params = await algodClient.getTransactionParams().do()

		const note = `dp.profileShowcase(${JSON.stringify(featuredGallery)})`

		txn = makePaymentTxnWithSuggestedParamsFromObject({
			suggestedParams: { ...params },
			from: walletAddress,
			to: walletAddress,
			amount: 0,
			note: Uint8Array.from(Buffer.from(note))
		})
	} catch (error) {
		// Display error notification
		addToast(N_ERROR_CREATE_TXN)
		console.error(error)
		throw new Error(error)
	}

	return txn
}

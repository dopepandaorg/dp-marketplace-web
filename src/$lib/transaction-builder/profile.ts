import { Buffer } from 'buffer'
import { Transaction, makePaymentTxnWithSuggestedParamsFromObject } from 'algosdk'
import { getAlgoClient } from '../helper/algoClient'
import { addToast } from '../../stores/toast'
import { N_ERROR_CREATE_TXN } from '../constants/notifications'

export const buildTransactionProfileEdit = async (
	walletAddress: string,
	displayName: string,
	bio: string
): Promise<Transaction> => {
	let txn: Transaction

	try {
		// Load Algorand client
		const algodClient = getAlgoClient()
		const params = await algodClient.getTransactionParams().do()

		const note = `dp.profile({"display_name":"${displayName}","bio":"${bio}"})`

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

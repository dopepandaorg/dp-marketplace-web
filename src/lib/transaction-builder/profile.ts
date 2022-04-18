import { Buffer } from 'buffer'
import { Transaction, makePaymentTxnWithSuggestedParamsFromObject } from 'algosdk'
import { getAlgoClient } from '../helper/algoClient'
import { addToast } from '../../stores/toast'
import { N_ERROR_CREATE_TXN } from '../constants/notifications'
import type { ProfileRecord } from '$lib/interfaces/profile'

export const buildTransactionProfileEdit = async (
	walletAddress: string,
	displayName: string,
	bio: string,
	avatar_cid: string,
	banner_cid: string,
	social_twitter: string,
	social_instagram: string,
	social_website: string
): Promise<Transaction> => {
	let txn: Transaction

	try {
		// Load Algorand client
		const algodClient = getAlgoClient()
		const params = await algodClient.getTransactionParams().do()

		const attributes = {
			display_name: displayName,
			bio,
			social_twitter,
			social_instagram,
			social_website
		} as ProfileRecord

		if (avatar_cid) attributes.avatar_cid = avatar_cid
		if (banner_cid) attributes.banner_cid = banner_cid

		const note = `dp.profile(${JSON.stringify(attributes)})`

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

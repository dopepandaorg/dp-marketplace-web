import { Buffer } from 'buffer'
import { Transaction, makePaymentTxnWithSuggestedParamsFromObject } from 'algosdk'
import { getAlgoClient } from '$lib/helper/algoClient'
import { addToast } from '$lib/stores/toast'
import { N_ERROR_CREATE_TXN } from '$lib/constants/notifications'
import type { CollectionRecord } from '$lib/interfaces/collection'

export const buildTransactionCreateCollection = async (
	walletAddress: string,
	prefix: string,
	title: string,
	description?: string
): Promise<Transaction> => {
	let txn: Transaction

	try {
		// Load Algorand client
		const algodClient = getAlgoClient()
		const params = await algodClient.getTransactionParams().do()

		const attributes = {
			pattern_prefix: prefix,
			title
		}

		if (description) {
			attributes['description'] = description
		}

		const note = `dp.collection(${JSON.stringify(attributes)})`

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

export const buildTransactionCollectionEdit = async (
	walletAddress: string,
	id: string,
	title: string,
	slug: string,
	creator: string,
	description: string,
	pattern_prefix: string,
	avatar_cid: string,
	banner_cid: string,
	social_twitter: string,
	social_discord: string,
	social_reddit: string,
	social_website: string
): Promise<Transaction> => {
	let txn: Transaction

	try {
		// Load Algorand client
		const algodClient = getAlgoClient()
		const params = await algodClient.getTransactionParams().do()

		const attributes = {
			id,
			title,
			slug,
			creator,
			description,
			pattern_prefix
		} as CollectionRecord

		if (avatar_cid) attributes.avatar_cid = avatar_cid
		if (banner_cid) attributes.banner_cid = banner_cid
		if (social_twitter) attributes.social_twitter = social_twitter
		if (social_discord) attributes.social_discord = social_discord
		if (social_reddit) attributes.social_reddit = social_reddit
		if (social_website) attributes.social_website = social_website

		const note = `dp.collection(${JSON.stringify(attributes)})`

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

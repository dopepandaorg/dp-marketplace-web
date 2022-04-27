import { Buffer } from 'buffer'
import {
	Transaction,
	assignGroupID,
	makeApplicationCreateTxnFromObject,
	getApplicationAddress,
	makeApplicationCallTxnFromObject,
	makeAssetTransferTxnWithSuggestedParamsFromObject,
	makePaymentTxnWithSuggestedParamsFromObject,
	makeApplicationDeleteTxnFromObject
} from 'algosdk'
import { getAlgoClient } from '$lib/helper/algoClient'
import { addToast } from '$lib/stores/toast'
import { N_ERROR_CREATE_TXN } from '$lib/constants/notifications'
import { uint64ToBigEndian } from '$lib/helper/utils'

export const buildTransactionBuyEscrow = async (
	walletAddress: string,
	creatorAddress: string,
	appId: number,
	assetId: number,
	price: number,
	qty: number
): Promise<Transaction[]> => {
	let txns: Transaction[] = []

	try {
		if (price <= 0 || qty <= 0) {
			throw new Error('Incorrect Options')
		}

		// Load Algorand client
		const algodClient = getAlgoClient()
		const params = await algodClient.getTransactionParams().do()

		const appAddr = getApplicationAddress(appId)

		const optInTx = makeAssetTransferTxnWithSuggestedParamsFromObject({
			suggestedParams: { ...params },
			from: walletAddress,
			to: walletAddress,
			amount: 0,
			assetIndex: assetId
		})

		const buyTxn = makeApplicationCallTxnFromObject({
			suggestedParams: { ...params },
			from: walletAddress,
			appIndex: appId,
			onComplete: 0,
			appArgs: [new Uint8Array(Buffer.from('on_buy')), uint64ToBigEndian(qty)],
			foreignAssets: [assetId],
			accounts: [walletAddress]
		})

		const payTxn = makePaymentTxnWithSuggestedParamsFromObject({
			suggestedParams: { ...params },
			from: walletAddress,
			to: appAddr,
			amount: price * (1_000 * 1_000)
		})

		const closeTxn = makeApplicationDeleteTxnFromObject({
			suggestedParams: { ...params },
			from: walletAddress,
			appIndex: appId,
			foreignAssets: [assetId],
			accounts: [creatorAddress]
		})

		txns = assignGroupID([optInTx, payTxn, buyTxn, closeTxn])
	} catch (error) {
		// Display error notification
		addToast(N_ERROR_CREATE_TXN)
		console.error(error)
		throw new Error(error)
	}

	return txns
}

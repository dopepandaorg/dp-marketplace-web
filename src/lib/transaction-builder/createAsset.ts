import { Transaction, makeAssetCreateTxnWithSuggestedParamsFromObject } from 'algosdk'
import { getAlgoClient } from '$lib/helper/algoClient'
import { addToast } from '$lib/stores/toast'
import { N_ERROR_CREATE_TXN } from '$lib/constants/notifications'
import type { AssetAttribute, AssetData, AssetMetadata } from '$lib/interfaces/asset'
import type { AssetMetadataStandard } from '$lib/constants/enums'
import { slugify } from '$lib/helper/stringUtils'

export const buildTransactionCreateASA = async (
	walletAddress: string,
	assetData: AssetData,
	fractions?: number
): Promise<Transaction> => {
	let txn: Transaction

	try {
		// Load Algorand client
		const algodClient = getAlgoClient()
		const params = await algodClient.getTransactionParams().do()

		const metadata = buildMetadata(
			assetData.metadataStandard,
			assetData.description,
			assetData.mimeType,
			assetData.metadataAttributes
		)

		txn = makeAssetCreateTxnWithSuggestedParamsFromObject({
			from: walletAddress,
			manager: walletAddress,
			reserve: walletAddress,
			assetName: assetData.assetName,
			unitName: assetData.unitName,
			assetURL: assetData.assetURL,
			suggestedParams: { ...params },
			total: 1,
			decimals: fractions ? fractions : 0,
			defaultFrozen: false,
			note: Uint8Array.from(Buffer.from(JSON.stringify(metadata)))
		})
	} catch (error) {
		// Display error notification
		addToast(N_ERROR_CREATE_TXN)
		console.error(error)
		throw new Error(error)
	}

	return txn
}

export const buildMetadata = (
	standard: AssetMetadataStandard,
	description?: string,
	mimeType?: string,
	attributes?: AssetAttribute[]
): AssetMetadata => {
	const metadata = {
		standard: standard
	}

	if (description) {
		metadata['description'] = description
	}

	if (mimeType) {
		metadata['mime_type'] = mimeType
	}

	if (attributes && attributes.length > 0) {
		const properties = {}
		attributes.map((a) => {
			if (!!a.key && !!a.value) {
				properties[slugify(a.key)] = slugify(a.value)
			}
		})

		metadata['properties'] = properties
	}

	return metadata
}

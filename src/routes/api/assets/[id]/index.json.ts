import type { RequestHandler } from '@sveltejs/kit'
import type { AlgoIndexerAsset } from '$lib/interfaces/indexer'
import { API_ASSET, API_BLOCK } from '$lib/constants/api'
import { indexerApi } from '$lib/helper/http'
import type { AssetRecord } from '$lib/interfaces/asset'

interface FetchResponse {
	asset: AlgoIndexerAsset
}

/** @type {import('./[id]').RequestHandler} */
export const get: RequestHandler = async ({ params }) => {
	const { id } = params

	let response: AssetRecord

	try {
		const assetResponse = await indexerApi<FetchResponse>(API_ASSET(Number(id)))
		const asset = assetResponse.asset
		let assetCreatedAt
		let assetCreatedTx

		if (asset['created-at-round']) {
			const blockResponse = await indexerApi<any>(API_BLOCK(asset['created-at-round']))
			const timestamp = blockResponse.timestamp

			// Convert to epoch timestamp
			assetCreatedAt = timestamp * 1000

			// Find the created at tx from block transctions
			const foundTx = blockResponse.transactions.find((tx) => tx.sender === asset.params.creator)
			if (foundTx) assetCreatedTx = foundTx.id
		}

		response = {
			id: asset.index,
			name: (asset.params && asset.params.name) || '',
			unit: (asset.params && asset.params['unit-name']) || '',
			url: (asset.params && asset.params.url) || '',
			description: (asset.params && asset.params.description) || '',

			decimal: asset.params.decimals,
			total: asset.params.total,
			creator: asset.params.creator,

			isDeleted: asset.deleted,
			isNFT: false,

			createdAt: assetCreatedAt,
			createdTx: assetCreatedTx
		}

		if (response.url.indexOf('ipfs') !== -1 && response.decimal === 0) {
			response.isNFT = true
		}
	} catch (error) {
		return {
			status: 404,
			error: new Error(`Asset Not found: /assets/${id}`)
		}
	}

	return {
		body: {
			id: Number(id),
			...response
		}
	}
}

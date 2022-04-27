import type { RequestHandler } from '@sveltejs/kit'
import type { AlgoIndexerAssetHolding } from '$lib/interfaces/indexer'
import { API_WALLET_ASSETS } from '$lib/constants/api'
import { indexerApi } from '$lib/helper/http'

interface FetchResponse {
	assets: AlgoIndexerAssetHolding[]
}

export const get: RequestHandler = async ({ params }) => {
	const { wallet } = params

	let assets = []

	try {
		const walletResponse = await indexerApi<FetchResponse>(API_WALLET_ASSETS(wallet))
		assets = walletResponse.assets

		// Sort by latest first
		assets.sort((a, b) => {
			return b['opted-in-at-round'] - a['opted-in-at-round']
		})
	} catch (error) {
		console.log('error', error)
	}

	return {
		body: {
			assets
		}
	}
}

import type { RequestHandler } from '@sveltejs/kit'
import type { AlgoIndexerAsset } from '$lib/interfaces/indexer'
import { API_WALLET_CREATED_ASSETS } from '$lib/constants/api'
import { indexerApi } from '$lib/helper/http'

interface FetchResponse {
	assets: AlgoIndexerAsset[]
}

export const get: RequestHandler = async ({ params }) => {
	const { wallet } = params

	let assets = []

	try {
		const walletResponse = await indexerApi<FetchResponse>(API_WALLET_CREATED_ASSETS(wallet))

		assets = walletResponse.assets
	} catch (error) {
		console.log('error', error)
	}

	return {
		body: {
			assets
		}
	}
}

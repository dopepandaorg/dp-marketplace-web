import type { RequestHandler } from '@sveltejs/kit'
import type { AssetHoldingRecord, AssetRecord } from '$lib/interfaces/asset'
import { API_WALLET } from '$lib/constants/api'
import { indexerApi } from '$lib/helper/http'

interface FetchResponse {
	account: { assets: AssetHoldingRecord[]; 'created-assets': AssetRecord[] }
}

export const get: RequestHandler = async ({ params }) => {
	const { wallet } = params

	let opted = []
	let created = []

	try {
		const walletResponse = await indexerApi<FetchResponse>(API_WALLET(wallet))

		opted = (walletResponse.account && walletResponse.account.assets) || []
		created = (walletResponse.account && walletResponse.account['created-assets']) || []
	} catch (error) {
		console.error(error)
	}

	return {
		body: {
			opted,
			created
		}
	}
}

import type { RequestHandler } from '@sveltejs/kit'
import type { AssetRecord } from '../../../$lib/interfaces/asset'
import { API_ASSET } from '../../../$lib/constants/api'
import { indexerApi } from '../../../$lib/helper/http'

interface FetchResponse {
	asset: AssetRecord
}

export const get: RequestHandler = async ({ params }) => {
	const { id } = params

	let response

	try {
		const assetResponse = await indexerApi<FetchResponse>(API_ASSET(Number(id)))
		const asset = assetResponse.asset

		response = {
			id: asset.index,
			name: (asset.params && asset.params.name) || '',
			unit: (asset.params && asset.params['unit-name']) || '',
			url: (asset.params && asset.params.url) || '',

			decimal: asset.params.decimals,
			total: asset.params.total,
			creator: asset.params.creator,

			isDeleted: asset.deleted,
			isNFT: false
		}

		if (response.url.startsWith('ipfs://') && response.decimal === 0 && response.total === 1) {
			response.isNFT = true
		}
	} catch (error) {
		console.error(error)
	}

	return {
		body: {
			id: Number(id),
			...response
		}
	}
}

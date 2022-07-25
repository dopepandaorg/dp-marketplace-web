import type { RequestHandler } from '@sveltejs/kit'
import { API_CREATOR_ASSETS_BY_UNIT } from '$lib/constants/api'
import { indexerApi } from '$lib/helper/http'

interface FetchResponse {
	assets: any
}

export const get: RequestHandler = async ({ params, url }) => {
	const { creator } = params
	const prefix = url.searchParams.get('prefix')

	let response
	let assets = []

	try {
		const assetsResponse = await indexerApi<FetchResponse>(
			API_CREATOR_ASSETS_BY_UNIT(creator, prefix)
		)
		assets = assetsResponse.assets
	} catch (error) {
		console.error(error)
	}

	response = {
		assets
	}

	return {
		body: {
			...response
		}
	}
}

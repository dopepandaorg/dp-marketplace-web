import type { RequestHandler } from '@sveltejs/kit'
import type { AlgoIndexerTransaction } from '$lib/interfaces/indexer'
import { API_ASSET_CONFIG_TXS } from '$lib/constants/api'
import { indexerApi } from '$lib/helper/http'

interface FetchResponse {
	transactions: AlgoIndexerTransaction[]
}

export const get: RequestHandler = async ({ params }) => {
	const { id } = params

	let response
	let transactions = []

	try {
		const txResponse = await indexerApi<FetchResponse>(API_ASSET_CONFIG_TXS(Number(id)))
		transactions = txResponse.transactions
	} catch (error) {
		console.error(error)
	}

	// Sort transactions to get the most recent
	transactions.sort((a, b) => b['round-time'] - a['round-time'])

	for (const transaction of transactions) {
		try {
			const noteBase64 = transaction.note && transaction.note.trim().replace(/[^ -~]+/g, '')

			if (noteBase64) {
				const noteString = Buffer.from(noteBase64, 'base64').toString()
				response = JSON.parse(noteString)
			}
		} catch (error) {
			console.log('Error in parsing response', error)
		}
	}

	return {
		body: {
			id: Number(id),
			...response
		}
	}
}

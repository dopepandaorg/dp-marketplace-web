import { API_WALLET } from '../../$lib/constants/api'
import type { RequestHandler } from '@sveltejs/kit'
import asaAssets from '../../$lib/data/asaAssets.json'

export const get: RequestHandler = async ({ params }) => {
	const { wallet } = params

	const walletRequest = await fetch(API_WALLET(wallet))
	const walletResponse = await walletRequest.json()

	let assets = []

	if (walletResponse.account) {
		assets.push({
			...asaAssets[0],
			amount: walletResponse.account.amount
		})

		if (walletResponse.account.assets) {
			assets = [
				...assets,
				...walletResponse.account.assets.map((a) => {
					const asset = asaAssets.find((asa) => asa.id === a['asset-id'])

					return {
						id: a['asset-id'],
						amount: a.amount,
						...asset
					}
				})
			]
		}
	}

	return {
		body: {
			wallet,
			assets
		}
	}
}

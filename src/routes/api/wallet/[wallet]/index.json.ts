import type { RequestHandler } from '@sveltejs/kit'
import { ALGO_EXPLORER_FETCH_OPTIONS, API_WALLET } from '../../../../$lib/constants/api'
import { getNativeASAs } from '../../../../$lib/constants/assets'

export const get: RequestHandler = async ({ params }) => {
	const { wallet } = params

	const walletRequest = await fetch(API_WALLET(wallet), { ...ALGO_EXPLORER_FETCH_OPTIONS })
	const walletResponse = await walletRequest.json()
	const nativeASAs = getNativeASAs()

	let assets = []

	if (walletResponse.account) {
		assets.push({
			...nativeASAs[0],
			amount: walletResponse.account.amount
		})

		if (walletResponse.account.assets) {
			assets = [
				...assets,
				...walletResponse.account.assets.map((a) => {
					const asset = nativeASAs.find((asa) => asa.id === a['asset-id'])

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

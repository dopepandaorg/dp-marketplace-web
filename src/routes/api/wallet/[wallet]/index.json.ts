import type { RequestHandler } from '@sveltejs/kit'
import { parseAmount } from '$lib/helper/utils'
import { ALGO_EXPLORER_FETCH_OPTIONS, API_WALLET } from '$lib/constants/api'
import { DPANDA_ASSET_ID, getNativeASAs } from '$lib/constants/assets'

export const get: RequestHandler = async ({ params }) => {
	const { wallet } = params

	const walletRequest = await fetch(API_WALLET(wallet), { ...ALGO_EXPLORER_FETCH_OPTIONS })
	const walletResponse = await walletRequest.json()
	const nativeASAs = getNativeASAs()

	let assets = []
	let dpandaTier = 0

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

					if (a['asset-id'] === DPANDA_ASSET_ID()) {
						dpandaTier = 1

						if (parseAmount(a.amount) > 1000) {
							dpandaTier = 2
						}

						if (parseAmount(a.amount) > 10000) {
							dpandaTier = 3
						}

						if (parseAmount(a.amount) > 100000) {
							dpandaTier = 4
						}

						if (parseAmount(a.amount) > 500000) {
							dpandaTier = 5
						}
					}

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
			assets,
			dpandaTier
		}
	}
}

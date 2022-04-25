import type { RequestHandler } from '@sveltejs/kit'
import { parseAmount } from '$lib/helper/utils'
import { ALGO_EXPLORER_FETCH_OPTIONS, API_WALLET, TINYMAN_LP_API } from '$lib/constants/api'
import { DPANDA_ASSET_ID, DPANDA_LP_ASSET_ID, getNativeASAs } from '$lib/constants/assets'
import { DPANDAMembershipTier } from '$lib/constants/enums'

export const get: RequestHandler = async ({ params }) => {
	const { wallet } = params

	const walletRequest = await fetch(API_WALLET(wallet), { ...ALGO_EXPLORER_FETCH_OPTIONS })
	const lpPoolRequest = await fetch(TINYMAN_LP_API())
	const walletResponse = await walletRequest.json()
	const lpPoolResponse = await lpPoolRequest.json()
	const nativeASAs = getNativeASAs()

	// Calculate LP Status
	const lpTokensIssued = lpPoolResponse.current_issued_liquidity_assets
	const lpDPANDATokens = lpPoolResponse.current_asset_1_reserves
	const lpDPANDAFactor = lpDPANDATokens / lpTokensIssued

	let assets = []
	let totalAlgo = 0
	let totalDPANDA = 0
	let totalDPANDALp = 0
	let dpandaTier: DPANDAMembershipTier = DPANDAMembershipTier.T_EMPTY

	if (walletResponse.account) {
		totalAlgo = walletResponse.account.amount
		assets.push({
			...nativeASAs[0],
			amount: walletResponse.account.amount
		})

		if (walletResponse.account.assets) {
			const nativeAssets = []

			walletResponse.account.assets.map((a) => {
				const asset = nativeASAs.find((asa) => asa.id === a['asset-id'])

				if (asset) {
					nativeAssets.push({
						id: a['asset-id'],
						amount: a.amount,
						...asset
					})

					if (asset.id === DPANDA_ASSET_ID()) {
						totalDPANDA += a.amount
					} else if (asset.id === DPANDA_LP_ASSET_ID()) {
						totalDPANDALp = Math.round(a.amount * lpDPANDAFactor)
						totalDPANDA += totalDPANDALp
					}
				}
			})

			assets = [...assets, ...nativeAssets]
		}
	}

	if (totalDPANDA > 0) {
		dpandaTier = DPANDAMembershipTier.T_BASE

		if (parseAmount(totalDPANDA) > 1) {
			dpandaTier = DPANDAMembershipTier.T1
		}

		if (parseAmount(totalDPANDA) > 125_000) {
			dpandaTier = DPANDAMembershipTier.T2
		}

		if (parseAmount(totalDPANDA) > 500_000) {
			dpandaTier = DPANDAMembershipTier.T3
		}
	}

	return {
		body: {
			wallet,
			assets,
			totalAlgo,
			totalDPANDA,
			totalDPANDALp,
			dpandaTier,
			dpandaLPFactor: lpDPANDAFactor
		}
	}
}

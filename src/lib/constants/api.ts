import { NETWORK_ENV } from '$lib/variables'
import { NetworkEnv } from './enums'

export const ALGO_PS2_API_ENV = (env?: NetworkEnv) =>
	(env || NETWORK_ENV) === NetworkEnv.MAINNET
		? `https://mainnet-algorand.api.purestake.io/ps2`
		: `https://testnet-algorand.api.purestake.io/ps2`

export const ALGO_EXPLORER_API_ENV = (env?: NetworkEnv) =>
	(env || NETWORK_ENV) === NetworkEnv.MAINNET
		? `https://mainnet-algorand.api.purestake.io/idx2/v2`
		: `https://testnet-algorand.api.purestake.io/idx2/v2`

export const API_WALLET = (wallet: string, env?: NetworkEnv) =>
	`${ALGO_EXPLORER_API_ENV(env)}/accounts/${wallet}`

export const API_WALLET_ASSETS = (wallet: string, env?: NetworkEnv) =>
	`${ALGO_EXPLORER_API_ENV(env)}/accounts/${wallet}/assets`

export const API_WALLET_CREATED_ASSETS = (wallet: string, env?: NetworkEnv) =>
	`${ALGO_EXPLORER_API_ENV(env)}/accounts/${wallet}/created-assets`

export const TINYMAN_LP_API = () =>
	`https://mainnet.analytics.tinyman.org/api/v1/pools/PMSLU3PDSQ4RTD7PB3MYXWNQL6INRLBYMNX7JTUWT2QXFKAI66DQQDRNVQ`

export const API_ASSET = (id: number, env?: NetworkEnv) =>
	`${ALGO_EXPLORER_API_ENV(env)}/assets/${id}?include-all=true`

export const API_BLOCK = (round: number, env?: NetworkEnv) =>
	`${ALGO_EXPLORER_API_ENV(env)}/blocks/${round}`

export const API_ASSET_CONFIG_TXS = (id: number, env?: NetworkEnv) =>
	`${ALGO_EXPLORER_API_ENV(env)}/transactions?asset-id=${id}&tx-type=acfg`

export const API_CREATOR_ASSETS_BY_UNIT = (creator: string, prefix: string, env?: NetworkEnv) =>
	`${ALGO_EXPLORER_API_ENV(env)}/assets?creator=${creator}${prefix ? '&unit=' + prefix : ''}`

export const ALGO_EXPLORER_FETCH_OPTIONS = {
	headers: {
		'X-API-Key': 'lWrz92T39U4SdqPQHWbZd14QXH94ucTe6Z1biOed'
	}
}

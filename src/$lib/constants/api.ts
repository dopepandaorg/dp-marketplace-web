import { NETWORK_ENV } from '../variables'
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

export const API_ASSET = (id: number, env?: NetworkEnv) =>
	`${ALGO_EXPLORER_API_ENV(env)}/assets/${id}?include-all=true`

export const ALGO_EXPLORER_FETCH_OPTIONS = {
	headers: {
		'X-API-Key': 'lWrz92T39U4SdqPQHWbZd14QXH94ucTe6Z1biOed'
	}
}

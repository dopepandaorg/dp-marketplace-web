import { NETWORK_ENV } from '$lib/variables'
import { NetworkEnv } from './enums'
import nativeASAs from '$lib/data/nativeASA.json'
import { attachImgixProxy } from '$lib/helper/imgixClient'

export const getWalletConnectBridge = (env?: NetworkEnv) =>
	(env || NETWORK_ENV) === NetworkEnv.MAINNET
		? 'https://wallet-connect-a.perawallet.app'
		: 'https://wallet-connect-b.perawallet.app'

export const getMyAlgoBridge = (env?: NetworkEnv) =>
	(env || NETWORK_ENV) === NetworkEnv.MAINNET
		? 'https://wallet.myalgo.com/bridge'
		: 'https://dev.myalgo.com/bridge'

export const DPANDA_ASSET_ID = (env?: NetworkEnv) =>
	(env || NETWORK_ENV) === NetworkEnv.MAINNET ? 391379500 : 85326355

export const DPANDA_LP_ASSET_ID = (env?: NetworkEnv) =>
	(env || NETWORK_ENV) === NetworkEnv.MAINNET ? 552661375 : 552661375

export const getNativeASAs = (env?: NetworkEnv) =>
	(env || NETWORK_ENV) === NetworkEnv.MAINNET
		? (nativeASAs as any).mainnet
		: (nativeASAs as any).testnet

export const convertIPFSCIDToUrl = (url: string): string => {
	return (url && attachImgixProxy('https://ipfs.io/ipfs/' + url)) || ''
}
export const convertIPFSUrl = (url: string): string => {
	return (
		(url && attachImgixProxy(url.replace('ipfs://', 'https://ipfs.io/ipfs/'))) || ''
	)
}

export const convertIPFSUrlOnly = (url: string): string => {
	return (url && url.replace('ipfs://', 'https://ipfs.io/ipfs/')) || ''
}

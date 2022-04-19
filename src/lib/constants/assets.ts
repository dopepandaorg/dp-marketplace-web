import { NETWORK_ENV } from '$lib/variables'
import { NetworkEnv } from './enums'
import nativeASAs from '$lib/data/nativeASA.json'
import { attachImgixProxy } from '$lib/helper/imgixClient'

export const getWalletConnectBridge = (env?: NetworkEnv) =>
	(env || NETWORK_ENV) === NetworkEnv.MAINNET
		? 'https://bridge.walletconnect.org'
		: 'https://bridge.walletconnect.org'

export const getMyAlgoBridge = (env?: NetworkEnv) =>
	(env || NETWORK_ENV) === NetworkEnv.MAINNET
		? 'https://wallet.myalgo.com/bridge'
		: 'https://dev.myalgo.com/bridge'

export const DPANDA_ASSET_ID = (env?: NetworkEnv) =>
	(env || NETWORK_ENV) === NetworkEnv.MAINNET ? 391379500 : 62484045

export const getNativeASAs = (env?: NetworkEnv) =>
	(env || NETWORK_ENV) === NetworkEnv.MAINNET
		? (nativeASAs as any).mainnet
		: (nativeASAs as any).testnet

export const convertIPFSCIDToUrl = (url: string): string => {
	return (url && attachImgixProxy('https://cloudflare-ipfs.com/ipfs/' + url)) || ''
}
export const convertIPFSUrl = (url: string): string => {
	return (
		(url && attachImgixProxy(url.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/'))) || ''
	)
}

export const convertIPFSUrlOnly = (url: string): string => {
	return (url && url.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/')) || ''
}

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
	// return (url && attachImgixProxy('https://w3s.link/ipfs/' + url)) || ''
	// return (url && (url.indexOf('ipfs://') === 0 ? url.replace('ipfs://', 'https://w3s.link/ipfs/') : 'https://w3s.link/ipfs/' + url)) || ''
	return convertIPFSUrlOnly(url)
}
export const convertIPFSUrl = (url: string): string => {
	// return (url && attachImgixProxy(url.replace('ipfs://', 'https://w3s.link/ipfs/'))) || ''
	// return (url && (url.indexOf('ipfs://') !== -1 ? url.replace('ipfs://', 'https://w3s.link/ipfs/') : 'https://w3s.link/ipfs/' + url)) || ''
	return convertIPFSUrlOnly(url)
}

export const convertIPFSUrlOnly = (url: string): string => {
	let cleanURL = (url && url.indexOf('ipfs://') !== -1) ? url.replace('ipfs://', '') : url
	cleanURL = cleanURL.replace('https://gateway.pinata.cloud/ipfs/', '')
	cleanURL = cleanURL.split('#')[0]
	return 'https://w3s.link/ipfs/' + cleanURL
}

import { Buffer } from 'buffer'

export const formatWallet = (wallet: string, limit?: number) => {
	return wallet
		? wallet.slice(0, limit || 4) +
				' ... ' +
				wallet.slice(wallet.length - (limit || 4), wallet.length)
		: null
}

export const formatAmount = (amount: number) => {
	return Number(Number(amount / (1000 * 1000)).toFixed(3)).toLocaleString()
}

export const parseAmount = (amount: number) => {
	return Number(amount / (1000 * 1000))
}

export const assetImageUrl = (chain: 'algo', assetId: string, iconUrl?: string): string => {
	return iconUrl ? iconUrl : `https://asa-list.tinyman.org/assets/${assetId}/icon.svg`
}

export const explorerUrl = (chain: 'algo', path?: string) => {
	const isTestnet = localStorage.getItem('dp_algo-network-testnet') == 'true'
	return `https://${isTestnet ? 'testnet.' : ''}algoexplorer.io${path}`
}

export const explorerAddressUrl = (chain: 'algo', account: string): string => {
	const isTestnet = localStorage.getItem('dp_algo-network-testnet') == 'true'
	return `https://${isTestnet ? 'testnet.' : ''}algoexplorer.io/address/${account}`
}

export const isTouchDevice = () => {
	return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

export const isIOS = () => {
	return /(iPad|iPhone|iPod)/g.test(navigator.userAgent)
}

export const isMobile = () => {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export const triggerWalletDeeplink = () => {
	if (isMobile()) {
		window.location.href = isIOS() ? 'algorand-wc://' : 'algorand://'
	}
}

export const uint64ToBigEndian = (x: number | bigint) => {
	x = BigInt(x)
	// assertUint64(x)
	const buff = Buffer.alloc(8)
	buff.writeBigUInt64BE(x)
	return Uint8Array.from(buff)
}

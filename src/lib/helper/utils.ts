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

export const assetImageUrl = (chain: 'algo', assetId: string): string => {
	return `https://asa-list.tinyman.org/assets/${assetId}/icon.svg`
}

export const explorerAddressUrl = (chain: 'algo', account: string): string => {
	const isTestnet = localStorage.getItem('dp_algo-network-testnet') == 'true'
	return `https://${isTestnet ? 'testnet.' : ''}algoexplorer.io/address/${account}`
}

export const isTouchDevice = () => {
	return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

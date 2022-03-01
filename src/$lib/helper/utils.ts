export const formatWallet = (wallet: string) => {
	return wallet ? wallet.slice(0, 4) + '...' + wallet.slice(wallet.length - 4, wallet.length) : null
}

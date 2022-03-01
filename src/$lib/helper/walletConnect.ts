import buffer from 'buffer'
if (window) {
	window.Buffer = buffer.Buffer
}

import WalletConnect from '@walletconnect/client'
import QRCodeModal from 'algorand-walletconnect-qrcode-modal'
import MyAlgoWallet from '@randlabs/myalgo-connect'

import { WalletType } from '../interfaces/wallet'
import { setWalletData, clearWalletData } from '../../stores/wallet'

let walletConnectConnector

/**
 * A slient check for a pre connected wallet
 *
 */
export const checkWallet = () => {
	walletConnectConnector = new WalletConnect({
		bridge: 'https://bridge.walletconnect.org',
		qrcodeModal: QRCodeModal,
		clientMeta: {
			name: 'DopePanda Marketplace',
			description: 'A next-gen creator ecosystem.',
			url: 'https://dopepanda.app',
			icons: ['https://dopepanda.app/favicon-96x96.png']
		}
	})

	const hasWalletConnect = window.localStorage.getItem('walletconnect')
	if (hasWalletConnect) {
		onConnectPera(true)
	}
}

/**
 * Myalgo
 */
export const onConnnectMyalgo = () => {
	const myAlgoWallet = new MyAlgoWallet({ bridgeUrl: 'https://dev.myalgo.com/bridge' })

	myAlgoWallet
		.connect({ shouldSelectOneAccount: true })
		.then((accounts) => {
			// Accounts is an array that has all public addresses shared by the user
			const account = accounts[0].address
			setWalletData(WalletType.MYALGO, account)
		})
		.catch((error) => {
			throw error
		})
}

/**
 * Connect with PERA Wallet
 *
 */
export const onConnectPera = (silent?: boolean) => {
	walletConnectConnector = new WalletConnect({
		bridge: 'https://bridge.walletconnect.org',
		qrcodeModal: QRCodeModal,
		clientMeta: {
			name: 'DopePanda Marketplace',
			description: 'A next-gen creator ecosystem.',
			url: 'https://dopepanda.app',
			icons: ['https://dopepanda.app/favicon-120x120.png']
		}
	})

	if (!walletConnectConnector.connected && !silent) {
		walletConnectConnector.createSession()
	} else {
		const account = walletConnectConnector.accounts[0]
		setWalletData(WalletType.PERA, account)
	}

	// Subscribe to connection events
	walletConnectConnector.on('connect', (error, payload) => {
		if (error) {
			throw error
		}

		// Get provided accounts
		const { accounts } = payload.params[0]
		const account = accounts[0]
		setWalletData(WalletType.PERA, account)
	})

	walletConnectConnector.on('session_update', (error, payload) => {
		if (error) {
			throw error
		}

		console.log('Session Update', payload)
	})

	walletConnectConnector.on('disconnect', (error, payload) => {
		if (error) {
			throw error
		}

		console.log('disconnect payload', payload)
		clearWalletData()
	})
}

export const onDisconnect = () => {
	if (walletConnectConnector) {
		walletConnectConnector.killSession()
		clearWalletData()
	} else {
		clearWalletData()
	}
}

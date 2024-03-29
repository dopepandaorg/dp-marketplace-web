import algosdk, { Transaction } from 'algosdk'
import { formatJsonRpcRequest } from '@json-rpc-tools/utils'
import WalletConnect from '@walletconnect/client'
import QRCodeModal from 'algorand-walletconnect-qrcode-modal'
import MyAlgoConnect from '@randlabs/myalgo-connect'
import { Buffer } from 'buffer'

import type { SignedTxn } from '$lib/interfaces/wallet'
import { WalletType } from '$lib/interfaces/wallet'
import { setWalletData, clearWalletData } from '$lib/stores/wallet'
import { addToast } from '$lib/stores/toast'
import { N_WALLET_DISCONNECT } from '$lib/constants/notifications'
import { getWalletConnectBridge, getMyAlgoBridge } from '$lib/constants/assets'

let walletConnectConnector: WalletConnect

/**
 * Myalgo
 */
export const onConnnectMyalgo = () => {
	const myAlgoWallet = new MyAlgoConnect({ bridgeUrl: getMyAlgoBridge(), disableLedgerNano: false })

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
export const onConnectPera = () => {
	console.log('Session Start Pera')

	walletConnectConnector = new WalletConnect({
		bridge: getWalletConnectBridge(),
		qrcodeModal: QRCodeModal
	})

	if (!walletConnectConnector.connected) {
		walletConnectConnector.createSession()
	} else {
		console.log('Wallet Connect URI', walletConnectConnector.uri)
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
		console.log('accounts on connect', accounts, payload)
		setWalletData(WalletType.PERA, account)
	})

	walletConnectConnector.on('session_update', (error, payload) => {
		console.log('%cOn session_update')
		if (error) {
			throw error
		}
		const { accounts } = payload.params[0]
		console.log('accounts on update', accounts, payload)
	})

	walletConnectConnector.on('disconnect', (error) => {
		if (error) {
			throw error
		}

		clearWalletData()
		addToast(N_WALLET_DISCONNECT)
	})
}

/**
 *
 */
export const onClearPera = () => {
	if (walletConnectConnector) {
		// walletConnectConnector.transportClose()
	}
}

export const onDisconnect = () => {
	if (walletConnectConnector) {
		walletConnectConnector.killSession()
		clearWalletData()
	} else {
		clearWalletData()
	}
}

export const onMyalgoSignTx = async (txn: Transaction): Promise<SignedTxn> => {
	const myAlgoConnect = new MyAlgoConnect({ bridgeUrl: getMyAlgoBridge() })
	const signedTxns = await myAlgoConnect.signTransaction(txn.toByte())
	return signedTxns
}

export const onMyalgoSignTxMultiple = async (txns: Transaction[]): Promise<SignedTxn[]> => {
	const myAlgoConnect = new MyAlgoConnect({ bridgeUrl: getMyAlgoBridge() })

	const signedTxns = await myAlgoConnect.signTransaction(txns.map((txn) => txn.toByte()))
	return signedTxns
}

export const onPeraSignTx = async (txn: Transaction, description: string): Promise<SignedTxn> => {
	onConnectPera()

	const signedTx = { txID: txn.txID(), blob: null }
	const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString('base64')
	const txnsToSign = [
		{
			txn: encodedTxn,
			message: description
		}
	]

	const requestParams = [txnsToSign]
	const request = formatJsonRpcRequest('algo_signTxn', requestParams)
	const result: Array<string | null> = await walletConnectConnector.sendCustomRequest(request)

	const decodedResult = result
		.filter((element) => !!element)
		.map((element) => {
			return element ? new Uint8Array(Buffer.from(element, 'base64')) : null
		})

	if (decodedResult && decodedResult.length > 0) {
		signedTx.blob = decodedResult[0]
	} else {
		throw Error('Unable to fetch signature')
	}

	return signedTx
}

export const onPeraSignTxMultiple = async (
	txns: Transaction[],
	description: string
): Promise<SignedTxn[]> => {
	onConnectPera()

	let signedTxns = []
	const txnsToSign: any = txns.map((txn) => {
		const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString('base64')
		signedTxns.push({ txID: txn.txID(), blob: null })

		return {
			txn: encodedTxn,
			message: 'Description of transaction being signed'
		}
	})

	const requestParams = [txnsToSign]
	const request = formatJsonRpcRequest('algo_signTxn', requestParams)
	const result: Array<string | null> = await walletConnectConnector.sendCustomRequest(request)

	const decodedResult = result
		.filter((element) => !!element)
		.map((element) => {
			return element ? new Uint8Array(Buffer.from(element, 'base64')) : null
		})

	if (decodedResult && decodedResult.length > 0) {
		decodedResult.map((d, i) => (signedTxns[i].blob = d))
	} else {
		throw Error('Unable to fetch signature')
	}

	return signedTxns
}

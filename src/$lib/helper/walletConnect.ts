import algosdk, { Transaction } from 'algosdk'
import { formatJsonRpcRequest } from '@json-rpc-tools/utils'
import WalletConnect from '@walletconnect/client'
import QRCodeModal from 'algorand-walletconnect-qrcode-modal'
import MyAlgoConnect from '@randlabs/myalgo-connect'
import { Buffer } from 'buffer'

import { SignedTxn, WalletType } from '../interfaces/wallet'
import { setWalletData, clearWalletData } from '../../stores/wallet'
import { addToast } from '../../stores/toast'
import { N_WALLET_DISCONNECT } from '../constants/notifications'
import { getWalletConnectBridge, getMyAlgoBridge } from '../constants/assets'

let walletConnectConnector: WalletConnect = new WalletConnect({
	bridge: getWalletConnectBridge(),
	qrcodeModal: QRCodeModal
})

/**
 * A slient check for a pre connected wallet
 *
 */
export const checkWallet = () => {
	// walletConnectConnector = new WalletConnect({
	// 	bridge: getWalletConnectBridge(),
	// 	qrcodeModal: QRCodeModal,
	// 	clientMeta: {
	// 		name: 'DopePanda Marketplace',
	// 		description: 'A next-gen creator ecosystem.',
	// 		url: 'https://dopepanda.app',
	// 		icons: ['https://dopepanda.app/favicon-96x96.png']
	// 	}
	// })
	// const hasWalletConnect = localStorage.getItem('walletconnect')
	// if (hasWalletConnect) {
	// 	onConnectPera(true)
	// }
}

/**
 * Myalgo
 */
export const onConnnectMyalgo = () => {
	const myAlgoWallet = new MyAlgoConnect({ bridgeUrl: getMyAlgoBridge() })

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

export const onMyalgoSignTxMultiple = async (txn: Transaction): Promise<SignedTxn[]> => {
	const myAlgoConnect = new MyAlgoConnect({ bridgeUrl: getMyAlgoBridge() })

	const txns = [txn]
	const txnGroup = algosdk.assignGroupID(txns)

	const signedTxns = await myAlgoConnect.signTransaction(txnGroup.map((txn) => txn.toByte()))
	return signedTxns
}

export const onPeraSignTx = async (txn: Transaction, description: string): Promise<SignedTxn> => {
	onConnectPera(true)

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

// export const onPeraSignTxMultiple = async (txn: Transaction): Promise<SignedTxn> => {
// 	if (walletConnectConnector) {
// 		const txns = [txn]
// 		const txnsToSign: any = txns.map((txn) => {
// 			const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString('base64')

// 			return {
// 				txn: encodedTxn,
// 				message: 'Description of transaction being signed'
// 			}
// 		})

// 		const requestParams = [txnsToSign]

// 		const request = formatJsonRpcRequest('algo_signTxn', requestParams)
// 		const result: Array<string | null> = await walletConnectConnector.sendCustomRequest(request)

// 		const indexToGroup = (index: number) => {
// 			for (let group = 0; group < txnsToSign.length; group++) {
// 				const groupLength = txnsToSign[group].length
// 				console.log('group length', groupLength)
// 				if (index < groupLength) {
// 					return [group, index]
// 				}

// 				index -= groupLength
// 			}

// 			throw new Error(`Index too large for groups: ${index}`)
// 		}

// 		const signedPartialTxns: Array<Array<Uint8Array | null>> = txnsToSign.map(() => [])
// 		result.forEach((r, i) => {
// 			console.log('result each', r, i)

// 			const [group, groupIndex] = indexToGroup(i)
// 			const toSign = txnsToSign[group][groupIndex]

// 			if (r == null) {
// 				if (toSign.signers !== undefined && toSign.signers?.length < 1) {
// 					signedPartialTxns[group].push(null)
// 					return
// 				}
// 				throw new Error(`Transaction at index ${i}: was not signed when it should have been`)
// 			}

// 			if (toSign.signers !== undefined && toSign.signers?.length < 1) {
// 				throw new Error(`Transaction at index ${i} was signed when it should not have been`)
// 			}

// 			const rawSignedTxn = Buffer.from(r, 'base64')
// 			signedPartialTxns[group].push(new Uint8Array(rawSignedTxn))
// 		})

// 		const signedTxns: Uint8Array[][] = signedPartialTxns.map((signedPartialTxnsInternal, group) => {
// 			return signedPartialTxnsInternal.map((stxn, groupIndex) => {
// 				if (stxn) {
// 					return stxn
// 				}
// 			})
// 		})
// 	} else {
// 		console.log('nope')
// 		return null
// 	}
// }

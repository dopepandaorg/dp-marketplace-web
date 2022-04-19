import algosdk from 'algosdk'
import { ALGO_PS2_API_ENV } from '$lib/constants/api'
import type { SignedTxn } from '$lib/interfaces/wallet'
import { PURESTAKE_API_KEY } from '$lib/variables'

const baseServer = ALGO_PS2_API_ENV()
const port = ''
const token = { 'X-API-Key': PURESTAKE_API_KEY }

let algodClient: algosdk.Algodv2

export const getAlgoClient = (): algosdk.Algodv2 => {
	if (!algodClient) {
		algodClient = new algosdk.Algodv2(token, baseServer, port)
	}

	return algodClient
}

/**
 * Check if its a valid algo address
 *
 * @param address Algo address
 * @returns
 */
export const isValidAlgoAddress = (address: string) => {
	return algosdk.isValidAddress(address)
}

/**
 * Submit a tx
 *
 * @param chain
 * @param stxns
 * @returns
 */
export async function algoSubmitTransaction(
	signedTxn: SignedTxn
): Promise<{ txId: string; confirmedRound: number }> {
	const { txId } = await getAlgoClient().sendRawTransaction(signedTxn.blob).do()
	const confirmedRound = await waitForTransaction(txId)

	return {
		txId,
		confirmedRound
	}
}

export async function algoSubmitTransactions(
	signedTxn: SignedTxn[]
): Promise<{ txId: string; confirmedRound: number }> {
	const stxns = signedTxn.map((s) => s.blob)
	const { txId } = await getAlgoClient().sendRawTransaction(stxns).do()
	const confirmedRound = await waitForTransaction(txId)

	return {
		txId,
		confirmedRound
	}
}

async function waitForTransaction(txId: string): Promise<number> {
	const client = getAlgoClient()

	let lastStatus = await client.status().do()
	let lastRound = lastStatus['last-round']

	// eslint-disable-next-line
	while (true) {
		const status = await client.pendingTransactionInformation(txId).do()

		if (status['pool-error']) {
			throw new Error(`Transaction Pool Error: ${status['pool-error']}`)
		}

		if (status['confirmed-round']) {
			return status['confirmed-round']
		}

		lastStatus = await client.statusAfterBlock(lastRound + 1).do()
		lastRound = lastStatus['last-round']
	}
}

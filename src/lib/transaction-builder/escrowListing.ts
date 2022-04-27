import { Buffer } from 'buffer'
import { Transaction, assignGroupID, makeApplicationCreateTxnFromObject, getApplicationAddress, makeApplicationCallTxnFromObject, makeAssetTransferTxnWithSuggestedParamsFromObject, makePaymentTxnWithSuggestedParamsFromObject } from 'algosdk'
import { getAlgoClient } from '$lib/helper/algoClient'
import { addToast } from '$lib/stores/toast'
import { N_ERROR_CREATE_TXN } from '$lib/constants/notifications'
import { uint64ToBigEndian } from '$lib/helper/utils'

const escrowApprovalProgram = 'BSAEAQACBCYDAmFzA2FpZAJhcDEYIxJAAU0xGSMSQABCMRkiEkAAOTEZJBJAADAxGSUSQAAnMRmBBRJAAAEAKGQkEjEAMgkSEChkJBMRRClkMgmIAU4yCYgBaiJDI0MjQyNDNhoAgAhvbl9zZXR1cBJAAHc2GgCABm9uX2J1eRJAAAEAMgopZHAANQE1ADEAKWRwADUDNQI0ATQANhoBFw8QKGQkEhA0AxAxFiIJOBAiEjEWIgk4ADEAEhAxFiIJOAcyChIQMRYiCTgIKmQ2GgEXCxIQEEQoImcpZDEWIgk4ADYaAReIAI4iQzIEgQMSKGQkExAxFiIJOBAiEhAxFiIJOAAyCRIQMRYiCTgHMgoSEDEWIgk4CIHguQwSEDEWIgg4ECUSEDEWIgg4ADIJEhAxFiIIOBQyChIQMRYiCDgSIg8QMRYiCDgRKWQSEEQqNhoBF2coJGexJbIQKWSyETIKshSzIkMxGyISRCgjZyk2GgAXZyJDNQY1BTUEMgo0BHAANQg1BzQINAc0Bg8QQQARsSWyEDQEshE0BbIUNAayErOJNQo1CTIKNAlwADUMNQs0DEEADbElshA0CbIRNAqyFbOJNQ0yCmAjE0EACbEishA0DbIJs4k='
const escrowClearProgram = 'BYEBQw=='

export const createAppEscrowListing = async (
    walletAddress: string,
    assetId: number
): Promise<Transaction> => {
    let txn: Transaction

    try {
        // Load Algorand client
        const algodClient = getAlgoClient()
        const params = await algodClient.getTransactionParams().do()
        
        const appArgs: Uint8Array[] = []
        appArgs.push(uint64ToBigEndian(assetId))

        txn = makeApplicationCreateTxnFromObject({
            suggestedParams: { ...params },
            from: walletAddress,
            onComplete: 0,
            approvalProgram: new Uint8Array(Buffer.from(escrowApprovalProgram, 'base64')),
            clearProgram: new Uint8Array(Buffer.from(escrowClearProgram, 'base64')),
            numLocalInts: 0,
            numLocalByteSlices: 0,
            numGlobalInts: 3,
            numGlobalByteSlices: 0,
            appArgs
        })
    } catch (error) {
        // Display error notification
        addToast(N_ERROR_CREATE_TXN)
        console.error(error)
        throw new Error(error)
    }

    return txn
}

export const buildTransactionEscrowListing = async (
    walletAddress: string,
    appId: number,
    assetId: number,
    price: number,
    qty: number
): Promise<Transaction[]> => {
    let txns: Transaction[] = []

    try {
        if (price <= 0 || qty <= 0) {
            throw new Error("Incorrect Options")
        }
        
        // Load Algorand client
        const algodClient = getAlgoClient()
        const params = await algodClient.getTransactionParams().do()

        const appAddr = getApplicationAddress(appId)
        const fundingAmount = (
            // min account balance
            100_000
            // additional min balance to opt into NFT
            + 100_000
            // 4 * min txn fee
            + 4 * 1_000
        )

        const fundAppTxn = makePaymentTxnWithSuggestedParamsFromObject({
            suggestedParams: { ...params },
            from: walletAddress,
            to: appAddr,
            amount: fundingAmount,
        })

        const setupTxn = makeApplicationCallTxnFromObject({
            suggestedParams: {...params},
            from: walletAddress,
            appIndex: appId,
            appArgs: [
                new Uint8Array(Buffer.from('on_setup')),
                uint64ToBigEndian(price * (1_000 * 1_000))
            ],
            foreignAssets: [assetId],
            onComplete: 0
        })

        const fundNFTTxn = makeAssetTransferTxnWithSuggestedParamsFromObject({
            suggestedParams: {...params},
            from: walletAddress,
            to: appAddr,
            amount: qty,
            assetIndex: assetId
        })

        txns = assignGroupID([fundAppTxn, setupTxn, fundNFTTxn])
    } catch (error) {
        // Display error notification
        addToast(N_ERROR_CREATE_TXN)
        console.error(error)
        throw new Error(error)
    }

    return txns
}

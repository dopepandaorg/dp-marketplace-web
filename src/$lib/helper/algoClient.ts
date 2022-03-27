import algosdk from 'algosdk'

let algodClient: algosdk.Algodv2

export const getAlgoClient = (): algosdk.Algodv2 => {
	if (!algodClient) {
		algodClient = new algosdk.Algodv2('', 'https://node.testnet.algoexplorerapi.io', '')
	}

	return algodClient
}

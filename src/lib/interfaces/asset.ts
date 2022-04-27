/**
 * Interface for records from Algo Indexer APIs
 *
 */
export interface AssetRecord {
	id: number
	name: string
	unit: string
	url: string
	description?: string

	decimal: number
	total: number

	creator: string

	isDeleted: boolean
	isNFT: boolean

	createdAt: EpochTimeStamp
	createdTx: string
}

/**
 * Interfance for asset metadata records
 */
export interface AssetMetadataRecord {
	description?: string
	properties?: { [key: string]: string }
}

/**
 *
 */
export interface AssetMetadata {
	assetName: string
	unitName: string
	assetURL: string
	isSensitive: boolean
}

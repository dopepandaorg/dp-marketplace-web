import type { AssetMetadataStandard } from '$lib/constants/enums'

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
export interface AssetMetadata {
	standard: AssetMetadataStandard
	mime_type?: string
	description?: string
	properties?: { [key: string]: string }
}

/**
 *
 */
export interface AssetData {
	assetName: string
	unitName: string
	description: string
	mimeType: string
	assetURL: string
	metadataStandard: AssetMetadataStandard
	metadataAttributes: AssetAttribute[]
	isSensitive: boolean
}

export interface AssetAttribute {
	key: string
	value: string
}

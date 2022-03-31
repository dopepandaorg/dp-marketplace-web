/**
 * Interface for records from Algo Indexer APIs
 *
 */
export interface AssetRecord {
	id: number
	index: number

	deleted?: boolean
	'created-at-round'?: number
	'destroyed-at-round'?: number
	params: AssetParamsRecord
}

export interface AssetHoldingRecord {
	'asset-id': number
	amount: number
	creator: boolean
	deleted?: number
	'is-frozen'?: number
	'opted-in-at-round': string
	'opted-out-at-round': string
}

export interface AssetParamsRecord {
	name?: string
	'name-b64'?: string

	unit?: string
	'unit-b64'?: string

	url?: string
	'url-b64'?: string

	description?: string

	total: number
	decimals: number
	creator: string

	freeze?: string
	manager?: string
	clawback?: string
	reserve?: string
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

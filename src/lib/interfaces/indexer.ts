export interface AlgoIndexerTransaction {
	'round-time': number
	note: string
}

export interface AlgoIndexerAsset {
	id: number
	index: number

	deleted?: boolean
	'created-at-round'?: number
	'destroyed-at-round'?: number
	params: AlgoIndexerAssetParams
}

export interface AlgoIndexerAssetHolding {
	'asset-id': number
	amount: number
	creator: boolean
	deleted?: number
	'is-frozen'?: number
	'opted-in-at-round': string
	'opted-out-at-round': string
}

export interface AlgoIndexerAssetParams {
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

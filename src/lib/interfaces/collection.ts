export interface CollectionRecord {
	id: string
	title: string
	slug: string
	creator: string
	description: string
	avatar_cid: string
	banner_cid: string
	pattern_prefix: string

	social_twitter
	social_discord
	social_reddit
	social_website

	collections_analytics_1ds: CollectionAnalytics1dRecord[]
	collections_analytics_1ds_aggregate: CollectionAnalytics1dAggregateRecord
}

export interface CollectionAnalytics1dRecord {
	total_items: number
	floor_price: number
	volume: number
}

export interface CollectionAnalytics1dAggregateRecord {
	aggregate: {
		sum: {
			volume: number
		}
	}
}

export interface ContestRecord {
	id: string
	title: string
	slug: string
	image_cid: string
	description: string
	start_at: string
	end_at: string
	contest_entries: ContestEntryRecord[]

	contest_entries_aggregate?: {
		aggregate: {
			count: number
		}
	}

	contest_entries_votes_aggregate?: {
		aggregate: {
			count: number
		}
	}

	prizes_html?: string
	rules_html?: string
}

export interface ContestEntryRecord {
	id: string
	title: string
	description: string
	asset_id: string
	votes?: number
	rank?: number
}

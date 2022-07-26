import { gql } from '@urql/svelte'

/**
 * Profiles
 */
export const Q_GET_PROFILE_BY_HANDLE = gql`
	query GetProfileByHandle($handle: String) {
		profiles(where: { handle: { _eq: $handle } }) {
			display_name
			handle
			wallet
			bio
			avatar_cid
			banner_cid
			social_instagram
			social_twitter
			social_website
			featured_gallery

			created_at
		}
	}
`
export const Q_GET_PROFILE = gql`
	query GetProfileByWallet($wallet: String!) {
		profiles_by_pk(wallet: $wallet) {
			display_name
			handle
			wallet
			bio
			avatar_cid
			banner_cid
			social_instagram
			social_twitter
			social_website
			featured_gallery

			created_at
		}
	}
`
export const Q_GET_PROFILE_MINI = gql`
	query GetProfileMini($wallet: String!) {
		profiles_by_pk(wallet: $wallet) {
			display_name
			avatar_cid
			handle
		}
	}
`
export const Q_SYNC_PROFILE = gql`
	mutation SyncProfileWithTx($txId: String, $wallet: String) {
		SyncProfileWithTx(txId: $txId, wallet: $wallet) {
			display_name
			handle
			wallet
			bio
			avatar_cid
			banner_cid
			social_instagram
			social_twitter
			social_website
		}
	}
`
export const Q_SYNC_FEATURED_GALLERY = gql`
	mutation UpdateProfileFeaturedGalleryWithTx($txId: String!, $wallet: String!) {
		UpdateProfileFeaturedGalleryWithTx(txId: $txId, wallet: $wallet) {
			wallet
			featured_gallery
		}
	}
`
export const Q_CONNECT_PROFILE = gql`
	mutation ConnectProfile($wallet: String!) {
		ConnectProfile(wallet: $wallet) {
			wallet
		}
	}
`

/**
 * Contests
 *
 */
export const Q_GET_CONTESTS = gql`
	query GetContest {
		contests(order_by: { start_at: desc }) {
			id
			slug
			title
			start_at
			voting_start_at
			voting_type
			end_at
			image_cid
			description
			contest_entries_aggregate {
				aggregate {
					count
				}
			}
		}
	}
`

export const Q_SUB_CONTEST_ENTRIES = gql`
	query SubContestEntries($contest_id: uuid!) {
		contest_entries(where: { contest_id: { _eq: $contest_id } }) {
			id
			title
			asset_id
		}
	}
`

export const Q_GET_CONTEST_VOTES = gql`
	query GetContestVotes($contest_id: uuid!) {
		contest_entries_votes_aggregate(where: { contest_id: { _eq: $contest_id } }) {
			aggregate {
				count
			}
		}
	}
`

export const Q_SUB_CONTEST_VOTES = gql`
	query SubContestVotes($contest_id: uuid!) {
		contest_entries_votes_aggregate(where: { contest_id: { _eq: $contest_id } }) {
			aggregate {
				count
			}
		}
	}
`

export const Q_GET_CONTEST_ENTRY_VOTES = gql`
	query GetContestEntryVotes($contest_id: uuid!, $asset_id: String!) {
		contest_entries_votes_aggregate(
			where: { contest_id: { _eq: $contest_id }, asset_id: { _eq: $asset_id } }
		) {
			aggregate {
				count
			}
		}
	}
`
export const Q_SUB_CONTEST_ENTRY_VOTES = gql`
	subscription SubContestEntryVotes($contest_id: uuid!, $asset_id: String!) {
		contest_entries_votes_aggregate(
			where: { contest_id: { _eq: $contest_id }, asset_id: { _eq: $asset_id } }
		) {
			aggregate {
				count
			}
		}
	}
`
export const Q_SUB_CONTEST_ENTRY_LEADERBOARD = gql`
	subscription SubContestEntryLeaderboard($contest_id: uuid!) {
		contest_entries_votes(distinct_on: asset_id, where: { contest_id: { _eq: $contest_id } }) {
			asset_id
			contest_entry {
				contest_entries_votes_aggregate {
					aggregate {
						sum {
							weight_dpanda
						}
						count
					}
				}
			}
		}
	}
`
export const Q_SUB_CONTEST_ENTRY_LEADERBOARD_VOTERS = gql`
	subscription SubContestEntryLeaderboard($contest_id: uuid!) {
		contest_entries_votes(distinct_on: asset_id, where: { contest_id: { _eq: $contest_id } }) {
			asset_id
			contest_entry {
				contest_entries_votes {
					voter
				}
			}
		}
	}
`
export const Q_SUB_DID_CONTEST_ENTRY_VOTE = gql`
	subscription SubDidContestEntryVote($asset_id: String!, $voter: String!, $contest_id: uuid!) {
		contest_entries_votes(
			where: {
				contest_id: { _eq: $contest_id }
				voter: { _eq: $voter }
				asset_id: { _eq: $asset_id }
			}
		) {
			asset_id
			voter
			tx_id
		}
	}
`
export const Q_GET_CONTEST = (id: string) => gql`
    query GetContestById {
        contests_by_pk(id: "${id}") {
            id
            title
			slug
			start_at
			voting_start_at
			voting_type
			end_at
			image_cid
			description
			contest_entries(order_by: { created_at: desc }) {
                id
				title
				asset_id
				creator
			}
        }
    }
`
export const Q_GET_CONTEST_BY_SLUG = gql`
	query GetContestsBySlug($slug: String) {
		contests(where: { slug: { _eq: $slug } }) {
			id
			title
			slug
			start_at
			voting_start_at
			voting_type
			end_at
			image_cid
			description
			prizes_html
			rules_html
			pending_submission_html
			contest_entries(order_by: { created_at: desc }) {
				id
				title
				asset_id
				creator
			}
		}
	}
`
export const Q_CAST_VOTE = gql`
	mutation CastVoteWithTx($txId: String!, $wallet: String!, $contestId: uuid!) {
		CastVoteWithTx(txId: $txId, wallet: $wallet, contestId: $contestId) {
			asset_id
			contest_id
			tx_id
			voter
		}
	}
`
export const Q_SUBMIT_ENTRY = gql`
	mutation SubmitEntryWithTx($txId: String!, $wallet: String!, $contestId: uuid!) {
		SubmitEntryWithTx(txId: $txId, wallet: $wallet, contestId: $contestId) {
			id
			created_tx_id
			created_at_round
			contest_id
			asset_id
		}
	}
`
export const Q_SUB_MY_CONTEST_ENTRY = gql`
	subscription SubContestEntry($contest_id: uuid!, $wallet: String!) {
		contest_entries(
			where: { _and: { contest_id: { _eq: $contest_id }, creator: { _eq: $wallet } } }
		) {
			id
			asset_id
			creator
			created_at
		}
	}
`

export const Q_GET_COLLECTIONS_TRENDING = gql`
	query GetTrendingCollections {
		collections(
			order_by: { collections_analytics_1ds_aggregate: { max: { floor_price: desc_nulls_last } } }
			limit: 12
			where: { is_verified: { _eq: true } }
		) {
			collections_analytics_1ds(limit: 2) {
				floor_price
				ts
			}
			id
			title
			slug
			creator
			avatar_cid
			is_verified
		}
	}
`
export const Q_GET_COLLECTION_BY_SLUG = gql`
	query GetCollectionBySlug($slug: String) {
		collections(where: { slug: { _eq: $slug } }) {
			id
			title
			slug
			creator
			description
			avatar_cid
			banner_cid
			pattern_prefix
			collections_analytics_1ds(limit: 1, order_by: { ts: desc }) {
				total_items
				floor_price
				volume
				ts
			}
			collections_analytics_1ds_aggregate {
				aggregate {
					sum {
						volume
					}
				}
			}
		}
	}
`

export const Q_GET_COLLECTION = gql`
	query GetCollection($id: uuid!) {
		collections_by_pk(id: $id) {
			id
			title
			slug
			creator
			description
			avatar_cid
			banner_cid
			pattern_prefix

			social_website
			social_twitter
			social_discord

			collections_analytics_1ds(limit: 1, order_by: { ts: desc }) {
				total_items
				floor_price
				volume
				ts
			}
			collections_analytics_1ds_aggregate {
				aggregate {
					sum {
						volume
					}
				}
			}
		}
	}
`

export const Q_GET_COLLECTIONS_BY_CREATOR = gql`
	query GetCollectionsByCreator($creator: String!) {
		collections(where: { creator: { _eq: $creator } }) {
			id
			title
			slug
			avatar_cid
			banner_cid
			is_verified
			collections_analytics_1ds(limit: 1, order_by: { ts: desc }) {
				total_items
				floor_price
				volume
				ts
			}
			collections_analytics_1ds_aggregate {
				aggregate {
					sum {
						volume
					}
				}
			}
		}
	}
`

export const Q_GET_CURATED_COLLECTIONS = gql`
	query GetCuratedCollections {
		curated_collections {
			id
			collection
			selected_assets
		}
	}
`

export const Q_CREATE_COLLECTION = gql`
	mutation CreateCollectionWithTx($txId: String!, $wallet: String!) {
		CreateCollectionWithTx(txId: $txId, wallet: $wallet) {
			id
			title
			slug
		}
	}
`
export const Q_SYNC_COLLECTION = gql`
	mutation SyncCollectionWithTx($txId: String, $wallet: String) {
		SyncCollectionWaithTx(txId: $txId, wallet: $wallet) {
			display_name
			handle
			wallet
			bio
			avatar_cid
			banner_cid
			social_instagram
			social_twitter
			social_website
		}
	}
`

export const Q_GET_ESCROW_LISTING = gql`
	query GetEscrowListing($id: bigint!) {
		escrow_listings(where: { asset_id: { _eq: $id }, status: { _eq: "active" } }) {
			id
			asset_id
			creator
			seller

			sale_fee
			sale_price
			sale_royalty
			sale_qty

			application_id
			application_address

			status
		}
	}
`
export const Q_CREATE_ESCROW_LISTING = gql`
	mutation SetupEscrowListing($txId: String!, $wallet: String!) {
		SetupEscrowListingWithTx(txId: $txId, wallet: $wallet) {
			id
			application_id
			application_address

			asset_id
			status
		}
	}
`

export const Q_UPDATE_ESCROW_LISTING = gql`
	mutation UpdateEscrowListing($txId: String!, $wallet: String!, $escrowId: String!) {
		UpdateEscrowListingWithTx(txId: $txId, wallet: $wallet, escrowId: $escrowId) {
			status
			id
			asset_id
			application_id
			application_address
			creator
			created_at
			updated_at
		}
	}
`
export const Q_REMOVE_ESCROW_LISTING = gql`
	mutation RemoveEscrowListing(
		$txId: String!
		$wallet: String!
		$id: uuid!
		$appId: bigint!
		$assetId: bigint!
	) {
		RemoveEscrowListingWithTx(
			txId: $txId
			wallet: $wallet
			id: $id
			appId: $appId
			assetId: $assetId
		) {
			application_id
			asset_id
			asset_unit
			seller
		}
	}
`

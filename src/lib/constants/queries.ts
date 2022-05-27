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

			created_at
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

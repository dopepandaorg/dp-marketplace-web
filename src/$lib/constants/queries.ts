import { gql } from '@urql/svelte'

/**
 * Profiles
 */
export const Q_GET_PROFILE_BY_HANDLE = (handle: string) => gql`
    query {
        profiles(where: {handle: {_eq: "${handle}"}}) {
            display_name
            handle
            wallet
        }
    }
`
export const Q_GET_PROFILE = gql`
	query GetProfileByWallet($wallet: String!) {
		profiles_by_pk(wallet: $wallet) {
			display_name
			handle
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
		contests {
			id
			slug
			title
			contest_entries_aggregate {
				aggregate {
					count
				}
			}
		}
	}
`
export const Q_GET_CONTEST = (id: string) => gql`
    query GetContestById {
        contests_by_pk(id: "${id}") {
            id
            title
			slug
			contest_entries {
                id
				title
				description
                created_at
				profile {
					wallet
					handle
					display_name
				}
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
			contest_entries {
				id
				title
				description
				created_at
				profile {
					wallet
					handle
					display_name
				}
			}
		}
	}
`

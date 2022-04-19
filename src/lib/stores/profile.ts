import { operationStore, query } from '@urql/svelte'
import { get } from 'svelte/store'
import { Q_GET_PROFILE } from '$lib/constants/queries'

/**
 * Initialize the wallet store
 */
export const profile = operationStore(Q_GET_PROFILE)

export const fetchProfile = (variables) => {
	profile.variables = variables
	return query(profile)
}

export const getProfile = () => {
	const profileStore = get(profile)
	const profileData = profileStore.data.profiles_by_pk

	return profileData
}

import { operationStore, query } from '@urql/svelte'
import { Q_GET_CONTEST_BY_SLUG } from '../$lib/constants/queries'
import { get } from 'svelte/store'

/**
 * Initialize the wallet store
 */
export let contest = operationStore(Q_GET_CONTEST_BY_SLUG)

export const fetchContest = (variables) => {
	operationStore(Q_GET_CONTEST_BY_SLUG)
	contest.variables = variables
	return query(contest)
}

export const getcontest = () => {
	const contestStore = get(contest)
	const contestData = contestStore.data.contests_by_pk

	return contestData
}

export const refetchContest = () => {
	contest.reexecute()
}

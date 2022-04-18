import { ContestStatus } from './enums'

export const contestTypes = [
	{ key: ContestStatus.ACTIVE, value: 'Active' },
	{ key: ContestStatus.UPCOMING, value: 'Upcoming' },
	{ key: ContestStatus.ENDED, value: 'Ended' }
]

export const getOptionValue = (key: string, array: any[]) => {
	const found = array.find((a) => a.key === key)
	return found ? found.value : key
}

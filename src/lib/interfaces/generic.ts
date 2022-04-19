import type { LoadingStatus } from '$lib/constants/enums'

export interface IAPIReponse {
	status: LoadingStatus
	error?: Error
}

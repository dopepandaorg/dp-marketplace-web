import type { LoadingStatus } from '../constants/enums'

export interface IAPIReponse {
	status: LoadingStatus
	error?: Error
}

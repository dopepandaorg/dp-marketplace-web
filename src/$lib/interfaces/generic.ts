import type { LoadingStatus } from '../constants/enums'

export interface IError extends Error {}

export interface IAPIReponse {
	status: LoadingStatus
	error?: IError
}

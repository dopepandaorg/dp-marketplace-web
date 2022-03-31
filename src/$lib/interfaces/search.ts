import type { IAPIReponse } from './generic'

export interface SearchResponse extends IAPIReponse {
	q: string
	results: any[]
}

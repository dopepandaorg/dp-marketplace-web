import type { RequestHandler } from '@sveltejs/kit'

export const post: RequestHandler = async ({ params }) => {
	const { txId } = params

	return {
		body: {
			txId
		}
	}
}

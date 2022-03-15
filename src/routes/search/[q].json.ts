import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler = async ({ params }) => {
	const { q } = params

	await wait()

	return {
		body: {
			q,
			results: []
		}
	}
}

const wait = (time?: number) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve()
		}, time || 1000)
	})
}

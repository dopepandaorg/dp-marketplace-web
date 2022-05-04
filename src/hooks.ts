/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	let isSSR = false
	const ssrIncludePrefix = ['/asset']

	if (event && event.url && event.url.href) {
		ssrIncludePrefix.map((s) => (isSSR = event.url.href.indexOf(s) !== -1))
	}

	const response = await resolve(event, {
		ssr: isSSR
	})

	return response
}

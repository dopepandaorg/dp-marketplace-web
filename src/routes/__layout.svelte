<script lang="ts">
	import '$lib/styles/main.scss'
	import 'nprogress/nprogress.css'
	import NProgress from 'nprogress'
	import { createClient as createWSClient } from 'graphql-ws'
	import { defaultExchanges, initClient, subscriptionExchange } from '@urql/svelte'
	import { navigating } from '$app/stores'
	import { HASURA_CLIENT_URI, HASURA_WS_CLIENT_URI } from '$lib/variables'

	import Footer from '$lib/components/Footer.svelte'
	import Header from '$lib/components/Header.svelte'
	import { browser } from '$app/env'

	// Initialize Hasura Client
	let subscriptionExchanges = []

	if (browser) {
		const wsClient = createWSClient({
			url: HASURA_WS_CLIENT_URI
		})

		subscriptionExchanges.push(
			subscriptionExchange({
				forwardSubscription: (operation) => ({
					subscribe: (sink) => ({
						unsubscribe: wsClient.subscribe(operation, sink)
					})
				})
			})
		)
	}

	initClient({
		url: HASURA_CLIENT_URI,
		exchanges: [...defaultExchanges, ...subscriptionExchanges]
	})

	// Initialize Navigation Progress Bar
	NProgress.configure({
		minimum: 0.16,
		showSpinner: false
	})

	$: {
		if ($navigating) {
			NProgress.start()
		}
		if (!$navigating) {
			NProgress.done()
		}
	}
</script>

<Header />

<main>
	<div class="inner">
		<slot />
	</div>
</main>

<Footer />

<style lang="scss" global>
	* {
		box-sizing: border-box;
	}
</style>

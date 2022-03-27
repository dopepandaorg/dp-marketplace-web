<script lang="ts">
	import '../$lib/styles/main.scss'
	import 'nprogress/nprogress.css'
	import NProgress from 'nprogress'

	import { initClient } from '@urql/svelte'
	import { navigating } from '$app/stores'
	import { HASURA_CLIENT_URI } from '../$lib/variables'

	import Footer from '../$lib/components/Footer.svelte'
	import Header from '../$lib/components/Header.svelte'

	// Initialize Hasura Client
	initClient({ url: HASURA_CLIENT_URI })

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

<script lang="ts">
	import { initClient } from '@urql/svelte'
	import '../$lib/styles/main.scss'
	import Footer from '../$lib/components/Footer.svelte'
	import Header from '../$lib/components/Header.svelte'

	initClient({
		url: 'https://hasura.testnet.dopepanda.org/v1/graphql'
	})
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

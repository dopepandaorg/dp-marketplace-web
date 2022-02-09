<script lang="ts">
	import '../$lib/styles/main.scss'
	import Footer from '../$lib/components/Footer.svelte'
	import Header from '../$lib/components/Header.svelte'
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

<script lang="ts">
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import { doSearchNew, search } from '../../stores/search'
	import EmptyTab from '../../$lib/components/common/EmptyTab.svelte'
	import SearchTile from '../../$lib/components/search/SearchTile.svelte'
	import { LoadingStatus } from '../../$lib/constants/enums'

	let q = $page.params.q
	let results = []
	let loadingStatus = null

	page.subscribe((p) => {
		q = p.params.q
	})

	search.subscribe((s) => {
		loadingStatus = s.status
		results = s.results
	})

	onMount(() => {
		if (q && q.length > 0) {
			doSearchNew(q)
		}
	})
</script>

<div class="section">
	<div class="container">
		<h2 class="search-page__title">Search results for "{q}"</h2>
		<div class="search-page__content">
			{#if loadingStatus === LoadingStatus.IN_PROGRESS}
				<SearchTile />
			{:else if results.length > 0}
				Results!
			{:else}
				<EmptyTab title="Search results not found" />
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.search-page__title {
		margin-bottom: 2rem;
	}
</style>

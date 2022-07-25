<script lang="ts">
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import { doSearchNew, search } from '$lib/stores/search'
	import { LoadingStatus } from '$lib/constants/enums'
	import EmptyPage from '$lib/components/common/EmptyPage.svelte'
	import ProfileContentSkeleton from '$lib/components/profile/ProfileContentSkeleton.svelte'

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
				<ProfileContentSkeleton />
			{:else if results.length > 0}
				<EmptyPage
					icon="/images/awaiting-collections.svg"
					title="Awaiting Verified Collections"
					description="If you are a creator, head over to 'My Collections' and setup your collection!"
				/>
			{:else}
				<EmptyPage
					icon="/images/awaiting-collections.svg"
					title="Awaiting Verified Collections"
					description="If you are a creator, head over to 'My Collections' and setup your collection!"
				/>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.search-page__title {
		margin-bottom: 2rem;
		text-align: center;
	}
</style>

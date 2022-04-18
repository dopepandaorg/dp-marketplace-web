<script lang="ts">
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import { doSearchNew, search } from '../../stores/search'
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
					icon="/images/restricted-access-icon.svg"
					title="Access Restricted"
					description="This feature is only available to Beta testers"
				/>
			{:else}
				<EmptyPage
					icon="/images/restricted-access-icon.svg"
					title="Access Restricted"
					description="This feature is only available to Beta testers"
				/>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.search-page__title {
		margin-bottom: 2rem;
	}
</style>

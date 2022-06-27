<script lang="ts">
	import type { CollectionRecord } from '$lib/interfaces/collection'

	import { getContext, onMount } from 'svelte'
	import type { Writable } from 'svelte/store'

	import AssetTile from '../common/AssetTile.svelte'
	import EmptyTab from '../common/EmptyTab.svelte'
	import CollectionFilter from './CollectionFilter.svelte'

	let creator
	let prefix
	let assets = []
	let isLoading = false

	const collectionData = getContext<Writable<CollectionRecord>>('collection-data')
	collectionData.subscribe((c) => {
		if (c) {
			creator = c.creator
			prefix = c.pattern_prefix
		}
	})

	onMount(() => {
		isLoading = true
		console.log('sdsd', creator)

		fetch(
			prefix
				? `/api/assets/by-creator/${creator}.json?prefix=${prefix}`
				: `/api/assets/by-creator/${creator}.json`
		)
			.then((response) => response.json())
			.then((body) => {
				assets = body.assets
			})
			.finally(() => (isLoading = false))
	})
</script>

<div class="collection-detail">
	<div class="collection-detail__inner">
		<!-- <div class="collection-detail__filter">
			<CollectionFilter />
		</div> -->

		<div class="collection-detail__results">
			{#if isLoading}
				<div class="collection-detail__list">
					<AssetTile id={null} showListing />
					<AssetTile id={null} showListing />
					<AssetTile id={null} showListing />
					<AssetTile id={null} showListing />
					<AssetTile id={null} showListing />
					<AssetTile id={null} showListing />
					<AssetTile id={null} showListing />
				</div>
			{:else if assets.length > 0}
				<div class="collection-detail__list">
					{#each assets as a}
						<AssetTile id={a.index} showListing />
					{/each}
				</div>
			{:else}
				<EmptyTab
					title="There's no activity here :("
					description="You can change the network you're on, or join us as a Beta tester and get early access to more features!"
				/>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.collection-detail {
		display: flex;
		flex-direction: column;
		min-height: 100vh;

		&__inner {
			display: grid;
			grid-template-columns: 1fr;
			gap: 2rem;

			height: 100%;
			flex: 1;
		}

		&__filter {
			background-color: var(--dp--black-02);
			border-radius: 0.25rem;

			position: sticky;
			top: 5vh;
			height: 80vh;
		}

		&__list {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr 1fr;
			gap: 1.5rem;
		}

		&__meta {
			margin-bottom: 1rem;
		}
	}
</style>

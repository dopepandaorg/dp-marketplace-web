<script lang="ts">
	import { convertIPFSCIDToUrl } from '$lib/constants/assets'

	import { Q_GET_COLLECTIONS_TRENDING } from '$lib/constants/queries'
	import { operationStore, query } from '@urql/svelte'
	import TrendingItem from '../common/TrendingItem.svelte'
	import TrendingItemPlaceholder from '../common/TrendingItemPlaceholder.svelte'

	const collections = operationStore<any>(Q_GET_COLLECTIONS_TRENDING)
	query(collections)

	let formattedCollections = []

	collections.subscribe((c) => {
		if (collections.data && collections.data.collections) {
			formattedCollections = collections.data.collections.map((c) => {
				const analyticsLast = c.collections_analytics_1ds[0]
				const analyticsPrev = c.collections_analytics_1ds[1]

				let floor = 0
				let diff = 0

				if (analyticsLast) {
					floor = analyticsLast.floor_price

					if (analyticsPrev) {
						diff =
							(analyticsLast.floor_price - analyticsPrev.floor_price) / analyticsLast.floor_price
					}
				}

				return {
					...c,
					floor,
					diff
				}
			})
		}
	})
</script>

<section class="section">
	<div class="container">
		<div class="section__header">
			<h3>Trending</h3>
		</div>

		{#if $collections.fetching}
			<div class="trending-list">
				<TrendingItemPlaceholder />
				<TrendingItemPlaceholder />
				<TrendingItemPlaceholder />
				<TrendingItemPlaceholder />
				<TrendingItemPlaceholder />
				<TrendingItemPlaceholder />
				<TrendingItemPlaceholder />
				<TrendingItemPlaceholder />
				<TrendingItemPlaceholder />
			</div>
		{:else if formattedCollections}
			<div class="trending-list">
				{#each formattedCollections as collection, _i}
					<TrendingItem
						rank={_i + 1}
						title={collection.title}
						slug={collection.slug || collection.id}
						imageUrl={convertIPFSCIDToUrl(collection.avatar_cid)}
						floorPrice={collection.floor}
						priceChange={collection.diff}
					/>
				{/each}
			</div>
		{/if}
	</div>
</section>

<style lang="scss">
	.trending-list {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;

		@media screen and (min-width: 768px) {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
</style>

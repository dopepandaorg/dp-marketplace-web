<script>
	import { goto } from '$app/navigation'
	import { Button } from 'carbon-components-svelte'
	import ArrowRight from 'carbon-icons-svelte/lib/ArrowRight.svelte'
	import TrendingItem from '../common/TrendingItem.svelte'
</script>

<section class="section">
	<div class="container">
		<div class="section__header">
			<h3>Trending</h3>
		</div>

		<div class="trending-list">
			<TrendingItem
				rank={1}
				title={'Collection Name'}
				imageUrl=""
				floorPrice={100}
				priceChange={1.25}
			/>
			<TrendingItem
				rank={1}
				title={'Collection Name'}
				imageUrl=""
				floorPrice={100}
				priceChange={1.25}
			/>
			<TrendingItem
				rank={1}
				title={'Collection Name'}
				imageUrl=""
				floorPrice={10000}
				priceChange={1.25}
			/>
			<TrendingItem
				rank={1}
				title={'Collection Name'}
				imageUrl=""
				floorPrice={100}
				priceChange={1.25}
			/>
			<TrendingItem
				rank={1}
				title={'Collection Name'}
				imageUrl=""
				floorPrice={100}
				priceChange={1.25}
			/>
			<TrendingItem
				rank={1}
				title={'Collection Name'}
				imageUrl=""
				floorPrice={100}
				priceChange={1.25}
			/>
			<TrendingItem
				rank={1}
				title={'Collection Name'}
				imageUrl=""
				floorPrice={100}
				priceChange={1.25}
			/>
			<TrendingItem
				rank={1}
				title={'Collection Name'}
				imageUrl=""
				floorPrice={100}
				priceChange={1.25}
			/>
			<TrendingItem
				rank={1}
				title={'Collection Name'}
				imageUrl=""
				floorPrice={100}
				priceChange={1.25}
			/>
		</div>
	</div>
</section>

<style lang="scss">
	.trending-list {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 1.25rem;
	}
</style>

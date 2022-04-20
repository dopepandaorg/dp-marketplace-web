<script>
	import { MasonryInfiniteGrid } from '@egjs/svelte-infinitegrid'

	let items = getItems(0, 20)

	function getItems(nextGroupKey, count) {
		const nextItems = []

		for (let i = 0; i < count; ++i) {
			const nextKey = nextGroupKey * count + i

			nextItems.push({ groupKey: nextGroupKey, key: nextKey })
		}
		return nextItems
	}
</script>

<section class="section">
	<div class="container">
		<div class="section__header">
			<h3>Explore the Marketplace</h3>
		</div>

		<div class="explore-grid__wrap">
			<MasonryInfiniteGrid class="explore-grid" gap={16} {items} let:visibleItems>
				{#each visibleItems as item (item.key)}
					<div class="item">
						<div class="thumbnail">
							<img
								src={`https://naver.github.io/egjs-infinitegrid/assets/image/${
									(item.key % 33) + 1
								}.jpg`}
								alt="egjs"
							/>
						</div>
						<!-- <div class="info">{`egjs ${item.key}`}</div> -->
					</div>
				{/each}
			</MasonryInfiniteGrid>
		</div>
	</div>
</section>

<style lang="scss">
	.explore-grid__wrap {
		position: relative;

		.item {
			width: 50%;
			min-height: 1px;
			border-radius: 10px;
			overflow: hidden;
		}

		@media (min-width: 768px) {
			.item {
				width: 33.33333333%;
			}
		}

		@media (min-width: 992px) {
			.item {
				width: 25%;
			}
		}

		@media (min-width: 1200px) {
			.item {
				width: calc((100% - 4rem) / 4);
			}
		}

		.item {
			background-color: var(--dp--black-02);

			img {
				max-width: 100%;
			}
		}
	}
</style>

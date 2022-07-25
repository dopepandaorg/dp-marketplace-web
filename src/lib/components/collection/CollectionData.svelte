<script lang="ts">
	import type { CollectionRecord } from '$lib/interfaces/collection'

	import { getContext } from 'svelte'
	import type { Writable } from 'svelte/store'

	let floorPrice = 0
	let volume = 0
	let totalVolume = 0
	let totalItems = 0

	const collectionData = getContext<Writable<CollectionRecord>>('collection-data')
	collectionData.subscribe((c) => {
		if (c) {
			const ca = c.collections_analytics_1ds[0]
			if (ca) {
				floorPrice = ca.floor_price
				volume = ca.volume
			}

			if (c.collections_analytics_1ds_aggregate) {
				totalVolume = c.collections_analytics_1ds_aggregate.aggregate.sum.volume || 0
			}
		}
	})

	const collectionItems = getContext<Writable<number>>('collection-items')
	collectionItems.subscribe((ci) => {
		totalItems = ci
	})
</script>

<div class="collection-meta">
	<div class="collection-meta__list">
		<div class="collection-meta__item">
			<label>Floor</label>
			<span>{floorPrice}</span>
		</div>
		<div class="collection-meta__item">
			<label>Volume 24h</label>
			<span>{volume}</span>
		</div>
		<div class="collection-meta__item">
			<label>Total Volume</label>
			<span>{totalVolume}</span>
		</div>
		<div class="collection-meta__item">
			<label>Total Items</label>
			<span>{totalItems}</span>
		</div>
	</div>
</div>

<style lang="scss">
	.collection-meta {
		display: flex;
		border-radius: 4px;
		background-color: var(--dp--black-03);
		margin-top: 1.5rem;
		width: 100%;

		@media screen and (min-width: 768px) {
			width: auto;
		}

		&__list {
			display: grid;
			grid-template-columns: 1fr 1fr;
			width: 100%;

			@media screen and (min-width: 768px) {
				width: auto;
				grid-template-columns: 1fr 1fr 1fr 1fr;
			}
		}

		&__item {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 0.75rem 0.75rem 0.75rem 1rem;
			border-left: 1px solid var(--dp--black-02);
			width: 100%;

			@media screen and (min-width: 768px) {
				width: auto;
				min-width: 140px;
			}

			&:first-child {
				border-left: 0;
			}

			label {
				font-size: 0.75rem;
				opacity: 0.5;
			}

			span {
				font-size: 1.125rem;
				margin-top: 0.375rem;
			}
		}
	}
</style>

<script lang="ts">
	import { Q_GET_CURATED_COLLECTIONS } from '$lib/constants/queries'

	import { operationStore, query } from '@urql/svelte'
	import IndexCuratedCollectionsItem from './IndexCuratedCollectionsItem.svelte'

	const collectionQuery = operationStore<any>(Q_GET_CURATED_COLLECTIONS)

	query(collectionQuery)
</script>

<section class="section">
	<div class="container">
		{#if $collectionQuery.data && $collectionQuery.data.curated_collections}
			<div class="section__header">
				<h3>Curated Collections</h3>
			</div>

			<div class="collections">
				{#each $collectionQuery.data.curated_collections as collection}
					<IndexCuratedCollectionsItem
						id={collection.collection}
						featuredAssets={collection.selected_assets}
					/>
				{/each}
			</div>
		{/if}
	</div>
</section>

<style lang="scss">
	.curated-collections-grid__wrap {
		position: relative;
	}

	.collections {
		display: flex;
		flex-direction: column;
	}
</style>

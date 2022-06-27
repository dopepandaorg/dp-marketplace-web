<script lang="ts">
	import IndexCuratedCollectionsItem from './IndexCuratedCollectionsItem.svelte'
</script>

<section class="section">
	<div class="container">
		<div class="section__header">
			<h3>Curated Collections</h3>
		</div>

		<div class="collections">
			<IndexCuratedCollectionsItem id="c83faf5b-c0ab-4d4d-9c54-2989b5fb530d" featuredAssets={[97268099, 97269558, 97269646]}/>
			<IndexCuratedCollectionsItem id="5ccccf9a-05e6-4959-9564-7ee02f31dfa8" featuredAssets={[97269867]} />
			<IndexCuratedCollectionsItem id="ceedb1a6-9ced-49dc-95bc-a14813d9870e" featuredAssets={[97270541, 97271462]} />
		</div>
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

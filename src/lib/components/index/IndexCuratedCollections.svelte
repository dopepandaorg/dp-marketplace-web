<script lang="ts">
	import IndexCuratedCollectionsItem from './IndexCuratedCollectionsItem.svelte'
</script>

<section class="section">
	<div class="container">
		<div class="section__header">
			<h3>Curated Collections</h3>
		</div>

		<div class="collections">
			<IndexCuratedCollectionsItem />
			<IndexCuratedCollectionsItem />
			<IndexCuratedCollectionsItem />
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

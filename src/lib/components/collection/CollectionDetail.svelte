<script lang="ts">
	import AssetTile from '../common/AssetTile.svelte'

	import CollectionFilter from './CollectionFilter.svelte'

	import CollectionHeader from './CollectionHeader.svelte'
	import CollectionMeta from './CollectionMeta.svelte'
</script>

<div class="collection-detail">
	<div class="collection-detail__inner">
		<div class="collection-detail__filter">
			<!-- <div class="collection-detail__meta">
				<CollectionMeta />
			</div> -->

			<CollectionFilter />
		</div>

		<div class="collection-detail__results">
			<div class="collection-detail__list">
				<AssetTile id={null} />
				<AssetTile id={null} />
				<AssetTile id={null} />
				<AssetTile id={null} />
				<AssetTile id={null} />
				<AssetTile id={null} />
				<AssetTile id={null} />
			</div>
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
			grid-template-columns: 320px 1fr;
			gap: 2rem;

			height: 100%;
			flex: 1;
		}

		&__filter {
			// display: flex;
			// align-items: center;
			// justify-content: center;
			background-color: var(--dp--black-02);
			border-radius: 0.25rem;

			position: sticky;
			top: 5vh;
			height: 80vh;
		}

		&__list {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr 1fr;
			gap: 1rem;
		}

		&__meta {
			margin-bottom: 1rem;
		}
	}
</style>

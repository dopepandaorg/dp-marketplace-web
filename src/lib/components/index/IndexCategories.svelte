<script>
	import CategoryTile from '../common/CategoryTile.svelte'
	import { CategoryTileTheme } from '$lib/constants/enums'
</script>

<section class="section">
	<div class="container">
		<div class="section__header">
			<h3>Categories</h3>
		</div>

		<div class="categories-list">
			<CategoryTile title="Images" imageUrl="" />
			<CategoryTile title="Videos" imageUrl="" theme={CategoryTileTheme.LIGHT} />
			<CategoryTile title="Music" imageUrl="" theme={CategoryTileTheme.LIGHT} />
			<CategoryTile title="3D Models" imageUrl="" />
			<CategoryTile title="Images" imageUrl="" />
			<CategoryTile title="Videos" imageUrl="" theme={CategoryTileTheme.LIGHT} />
			<CategoryTile title="Music" imageUrl="" theme={CategoryTileTheme.LIGHT} />
			<CategoryTile title="3D Models" imageUrl="" />
		</div>
	</div>
</section>

<style lang="scss">
	.categories-list {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		gap: 2rem;

		margin-top: 2rem;
	}
</style>

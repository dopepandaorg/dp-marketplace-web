<script>
	import { Dropdown, Tag } from 'carbon-components-svelte'
</script>

<div class="collection-meta">
	<div class="collection-meta__label">Showing 10 or 200 results</div>

	<div class="collection-meta__sort">
		<Dropdown
			size="sm"
			selectedId="0"
			items={[
				{ id: '0', text: 'Latest' },
				{ id: '1', text: 'Oldest' },
				{ id: '2', text: 'Rarity' }
			]}
		/>
	</div>
</div>

<Tag filter on:close>carbon-components</Tag>

<style>
	.collection-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>

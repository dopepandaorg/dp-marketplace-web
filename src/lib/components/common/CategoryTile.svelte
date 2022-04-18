<script lang="ts">
	import { ImageLoader } from 'carbon-components-svelte'
	import { CategoryTileTheme } from '$lib/constants/enums'

	export let title: string
	export let imageUrl: string
	export let theme: CategoryTileTheme = CategoryTileTheme.DARK
</script>

<div class="category-tile style--{theme}">
	<ImageLoader class="category-tile__image" src={imageUrl} alt={title} />
	<h4 class="category-tile__title">{title}</h4>
</div>

<style lang="scss">
	.category-tile {
		position: relative;

		display: flex;
		align-items: flex-end;
		justify-content: flex-end;

		padding: 1.25rem;
		min-height: 200px;
		overflow: hidden;

		border-radius: 5px;
		background-color: var(--dp--black-03);

		&__image {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;

			object-fit: cover;
			object-position: center;
		}

		&__title {
			font-size: 1.5rem;
			text-align: right;
		}

		&.style--light {
			color: #000;
		}

		&:hover {
			cursor: pointer;
		}
	}
</style>

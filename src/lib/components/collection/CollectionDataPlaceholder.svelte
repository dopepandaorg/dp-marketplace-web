<script lang="ts">
	import type { CollectionRecord } from '$lib/interfaces/collection'
	import { SkeletonPlaceholder } from 'carbon-components-svelte'

	import { getContext } from 'svelte'
	import type { Writable } from 'svelte/store'
</script>

<div class="collection-meta">
	<div class="collection-meta__list">
		<div class="collection-meta__item">
			<label>Floor</label>
			<span><SkeletonPlaceholder style="width: 80px; height: 1rem;" /></span>
		</div>
		<div class="collection-meta__item">
			<label>Volume 24h</label>
			<span><SkeletonPlaceholder style="width: 80px; height: 1rem;" /></span>
		</div>
		<div class="collection-meta__item">
			<label>Total Volume</label>
			<span><SkeletonPlaceholder style="width: 80px; height: 1rem;" /></span>
		</div>
		<div class="collection-meta__item">
			<label>Total Items</label>
			<span><SkeletonPlaceholder style="width: 80px; height: 1rem;" /></span>
		</div>
	</div>
</div>

<style lang="scss">
	.collection-meta {
		display: flex;
		border-radius: 4px;
		background-color: var(--dp--black-03);
		margin-top: 1.5rem;

		&__list {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr 1fr;
		}

		&__item {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 0.75rem 0.75rem 0.75rem 1rem;
			border-left: 1px solid var(--dp--black-02);
			min-width: 140px;

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

<script lang="ts">
	import { ImageLoader, SkeletonPlaceholder } from 'carbon-components-svelte'
</script>

<div class="trending-item">
	<div class="trending-item__rank">0</div>
	<div class="trending-item__image">
		<SkeletonPlaceholder style="width: 3rem; height: 3rem;" />
	</div>

	<div class="trending-item__content">
		<div class="trending-item__title">
			<SkeletonPlaceholder style="width: 70%; height: 1.25rem;" />
		</div>
		<div class="trending-item__floor-price">
			<img src="/icons/algo.svg" alt="Algo" />
			<SkeletonPlaceholder style="width: 3rem; height: 1rem;" />
		</div>
	</div>

	<div class="trending-item__price-change">
		<SkeletonPlaceholder style="width: 3rem; height: 1rem;" />
	</div>
</div>

<style lang="scss">
	.trending-item {
		display: flex;
		align-items: center;

		padding: 1.25rem;
		border-radius: 5px;
		background-color: var(--dp--black-03);

		&__rank {
			margin-right: 1rem;
		}

		&__image {
			width: 3rem;
			height: 3rem;
			margin-right: 1rem;

			background-color: var(--dp--black-02);
			border-radius: 50%;
		}

		&__content {
			flex: 1;
		}

		&__title {
			font-size: 1rem;
			font-weight: 500;
		}

		&__floor-price {
			font-size: 0.875rem;

			display: flex;
			align-items: center;
			margin-top: 0.625rem;

			img {
				width: 0.75rem;
				height: 0.75rem;
				margin-right: 0.375rem;
			}
		}

		&__price-change {
			font-size: 0.875rem;
		}
	}
</style>

<script lang="ts">
	import { formatPercentage } from '$lib/helper/stringUtils'

	import { ImageLoader } from 'carbon-components-svelte'

	export let rank: number
	export let title: string
	export let slug: string
	export let imageUrl: string
	export let floorPrice: number
	export let priceChange: number
</script>

<div class="trending-item">
	<a href="/collections/{slug}">
		<div class="trending-item__inner">
			<div class="trending-item__rank">{rank}</div>
			<div class="trending-item__image">
				<ImageLoader src={imageUrl} />
			</div>

			<div class="trending-item__content">
				<div class="trending-item__title">{title}</div>
				<div class="trending-item__floor-price">
					{#if floorPrice}
						<img src="/icons/algo.svg" alt="Algo" />
						{Number(floorPrice).toLocaleString()}
					{:else}
						N/A
					{/if}
				</div>
			</div>

			<div class="trending-item__price-change">
				{formatPercentage(priceChange)}
			</div>
		</div>
	</a>
</div>

<style lang="scss">
	.trending-item {
		&__inner {
			display: flex;
			align-items: center;

			padding: 1.25rem;
			border-radius: 5px;
			background-color: var(--dp--black-03);

			&:hover {
				background-color: var(--dp--black-04);
			}
		}

		&__rank {
			margin-right: 1rem;
		}

		&__image {
			width: 3rem;
			height: 3rem;
			margin-right: 1rem;

			background-color: var(--dp--black-02);
			border-radius: 5px;

			overflow: hidden;
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

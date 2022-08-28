<script lang="ts">
	import { formatPercentage } from '$lib/helper/stringUtils'
	import { formatAmount, formatNumber } from '$lib/helper/utils'
	import { ImageLoader, TooltipDefinition } from 'carbon-components-svelte'
	import GrowthIcon from 'carbon-icons-svelte/lib/Growth.svelte'

	export let rank: number
	export let title: string
	export let slug: string
	export let imageUrl: string
	export let floorPrice: number
	export let priceChange: number
	export let volume: number
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
						<TooltipDefinition tooltipText="Floor Price">
							{Number(floorPrice).toLocaleString()}
							<img src="/icons/algo.svg" alt="Algo" />
						</TooltipDefinition>
					{:else}
						N/A
					{/if}
				</div>
			</div>

			<div class="trending-item__value">
				<div class="trending-item__volume">
					<img src="/icons/algo.svg" alt="Algo" />
					{formatNumber(volume)}
				</div>

				{#if priceChange > 0}
					<div class="trending-item__price-change" class:increase={priceChange > 0}>
						{formatPercentage(priceChange)}

						{#if priceChange > 0}
							<GrowthIcon />
						{/if}
					</div>
				{/if}
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

		&__value {
			display: flex;
			align-items: flex-end;
			flex-direction: column;
		}

		&__floor-price {
			font-size: 0.875rem;

			display: flex;
			align-items: center;
			margin-top: 0.25rem;

			:global(.bx--tooltip--a11y) {
				font-size: 0.875rem;
			}

			img {
				width: 0.75rem;
				height: 0.75rem;
				margin-left: 0.25rem;
				margin-top: -1px;
			}
		}

		&__price-change {
			font-size: 0.75rem;

			display: flex;
			align-items: center;
			margin-top: 0.25rem;

			:global(svg) {
				float: left;
				width: 1rem;
				height: 1rem;
				margin-left: 0.25rem;
			}

			&.increase {
				color: #42be65;
			}
		}

		&__volume {
			font-size: 1.125rem;

			display: flex;
			align-items: center;

			span {
				font-size: 0.625rem;
				font-weight: 400;
				margin-left: 0.5rem;
				letter-spacing: 0.05rem;
				text-transform: uppercase;
				opacity: 0.75;
			}

			img {
				width: 0.875rem;
				height: 0.875rem;
				margin-right: 0.375rem;
				margin-top: -1px;
			}
		}
	}
</style>

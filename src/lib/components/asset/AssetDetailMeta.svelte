<script lang="ts">
	import dayjs from 'dayjs'
	import Launch from 'carbon-icons-svelte/lib/Launch.svelte'
	import type { AssetRecord } from '$lib/interfaces/asset'
	import { explorerUrl } from '$lib/helper/utils'

	export let asset: AssetRecord
</script>

<div class="asset-detail-meta">
	<div class="asset-detail-meta__item">
		<div class="asset-detail-meta__item__label">Unit</div>
		<div class="asset-detail-meta__item__value">
			{asset.unit}
		</div>
	</div>
	<div class="asset-detail-meta__item">
		<div class="asset-detail-meta__item__label">Asset ID</div>
		<div class="asset-detail-meta__item__value">
			<a href={explorerUrl('algo', `/asset/${asset.id}`)} target="_blank" rel="noopener noreferrer">
				{asset.id}
				<Launch />
			</a>
		</div>
	</div>
	<div class="asset-detail-meta__item">
		<div class="asset-detail-meta__item__label">Total Qty</div>
		<div class="asset-detail-meta__item__value">
			{asset.total}
		</div>
	</div>
	<div class="asset-detail-meta__item">
		<div class="asset-detail-meta__item__label">Minted At</div>
		<div class="asset-detail-meta__item__value">
			<div class="asset-detail-meta__timestamp">
				<a
					href={explorerUrl('algo', `/tx/${asset.createdTx}`)}
					target="_blank"
					rel="noopener noreferrer"
				>
					Minted on {dayjs(asset.createdAt).format('DD MMM YYYY')}
					<Launch />
				</a>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.asset-detail-meta {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;

		&__item {
			display: flex;
			flex-direction: column;
			align-items: center;

			@media screen and (min-width: 768px) {
				align-items: flex-start;
			}

			&__label {
				font-size: 0.75rem;
				margin-bottom: 0.375rem;
				opacity: 0.5;
			}

			&__value {
				font-size: 1rem;
				font-weight: 500;

				display: flex;
				align-items: center;

				img {
					width: 1.125rem;
					height: auto;
					float: left;
					margin-left: 0.25rem;
				}

				:global(svg) {
					float: right;
					margin-left: 0.5rem;
				}
			}
		}
	}
</style>

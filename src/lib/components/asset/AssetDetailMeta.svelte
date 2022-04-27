<script lang="ts">
	import dayjs from 'dayjs'
	import Launch from 'carbon-icons-svelte/lib/Launch.svelte'
	import type { AssetRecord } from '$lib/interfaces/asset'

	export let asset: AssetRecord
</script>

<div class="asset-detail-meta">
	<div class="asset-detail-meta__timestamp">
		<a href="http://algoexplorer.io/tx/{asset.createdTx}" target="_blank" rel="noopener noreferrer">
			Minted on {dayjs(asset.createdAt).format('DD MMM YYYY')}
			<Launch />
		</a>
	</div>
</div>

<style lang="scss">
	.asset-detail-meta {
		&__timestamp {
			display: flex;
			align-items: center;
			margin-top: 1.5rem !important;

			a {
				color: var(--dp--text-05);

				&:hover {
					color: #fff;
				}
			}

			:global(svg) {
				float: right;
				margin-left: 0.5rem;
			}
		}
	}
</style>

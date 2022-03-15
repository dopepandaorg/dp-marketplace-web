<script lang="ts">
	import { wallet } from '../../../stores/wallet'
	import { onDestroy } from 'svelte'
	import { assetImageUrl, formatAmount } from '../../../$lib/helper/utils'
	import asaAssets from '../../../$lib/data/asaAssets.json'
	import { Button, SkeletonPlaceholder } from 'carbon-components-svelte'

	export let unit: string
	const asset = (asaAssets as any[]).find((asa) => asa.unit === unit)
	let isLoading = true
	let amount = null

	const walletSub = wallet.subscribe((wallet) => {
		const foundAssetData = wallet.assets.find((a) => a.unit === unit)

		if (wallet.assets.length > 0) {
			isLoading = false

			if (foundAssetData) {
				amount = foundAssetData.amount
			}
		}
	})

	onDestroy(walletSub)
</script>

<div class="header-wallet-asset">
	<div class="header-wallet-asset__logo">
		<img src={assetImageUrl('algo', asset.id)} alt="" />
	</div>

	<div class="header-wallet-asset__details">
		<div class="header-wallet-asset__name">{asset.name}</div>
		<div class="header-wallet-asset__symbol">{unit.toUpperCase()}</div>
	</div>

	{#if isLoading}
		<SkeletonPlaceholder style="height: 32px;" />
	{:else if amount !== null}
		<div class="header-wallet-asset__amount">
			{formatAmount(amount)}
		</div>
	{:else}
		<div class="header-wallet-asset__opt-in">
			<Button size="small">Opt In</Button>
		</div>
	{/if}
</div>

<style lang="scss">
	.header-wallet-asset {
		display: flex;
		align-items: center;
		padding: 0.5rem;

		&__details {
			font-size: 0.875rem;
			flex: 1;

			display: flex;
			flex-direction: column;
		}

		&__symbol {
			font-weight: bold;
			font-size: 0.625rem;
			margin-top: 0.5rem;
		}

		&__logo {
			margin-right: 1rem;

			img {
				width: 1.5rem;
				height: 1.5rem;
			}
		}

		:global(button) {
			font-size: 0.75rem;
			padding: 0.5rem 1rem;
		}
	}
</style>

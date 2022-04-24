<script lang="ts">
	import { wallet } from '$lib/stores/wallet'
	import { onDestroy } from 'svelte'
	import { assetImageUrl, formatAmount, parseAmount } from '$lib/helper/utils'
	import { DPANDA_ASSET_ID, getNativeASAs } from '$lib/constants/assets'
	import { Button, SkeletonPlaceholder } from 'carbon-components-svelte'
	import { nWeightFormat } from '$lib/helper/stringUtils'

	export let unit: string
	export let isCompiledLP = false
	export let calculationFactor: number = null
	export let overrideUnitName: string = null
	const nativeAssets = getNativeASAs()
	const asset = nativeAssets.find((asa) => asa.unit === unit)
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
		<img src={assetImageUrl('algo', asset.id, asset.iconUrl)} alt="" />
	</div>

	<div class="header-wallet-asset__details">
		<div class="header-wallet-asset__name">{asset.name}</div>
		<div class="header-wallet-asset__symbol">
			{overrideUnitName ? overrideUnitName : unit.toUpperCase()}
		</div>
	</div>

	{#if isLoading}
		<SkeletonPlaceholder style="height: 32px;" />
	{:else if amount !== null}
		<div class="header-wallet-asset__amount">
			{formatAmount(calculationFactor ? calculationFactor * amount : amount)}

			{#if isCompiledLP && asset.id === DPANDA_ASSET_ID() && $wallet.totalDPANDALp}
				<span>+ {nWeightFormat(parseAmount($wallet.totalDPANDALp), 2)} in LP</span>
			{/if}
		</div>
	{:else if asset.id === DPANDA_ASSET_ID()}
		<div class="header-wallet-asset__opt-in">
			<Button
				size="small"
				on:click={() =>
					window.open('https://app.tinyman.org/#/swap?asset_in=0&asset_out=391379500', '_blank')}
				>Opt In</Button
			>
		</div>
	{:else}
		<div class="header-wallet-asset__opt-in">N/A</div>
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

		&__amount {
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			text-align: right;

			span {
				display: block;
				font-size: 0.625rem;
				text-align: right;
				width: 100%;
				color: yellow;
				margin-top: 0.375rem;
			}
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

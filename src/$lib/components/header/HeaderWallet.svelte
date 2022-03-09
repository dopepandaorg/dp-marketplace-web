<script>
	import { onDestroy, onMount } from 'svelte'
	import { syncWalletAssets, wallet } from '../../../stores/wallet'
	import { explorerAddressUrl } from '../../../$lib/helper/utils'

	import { formatWallet } from '../../../$lib/helper/utils'
	import { Launch16 } from 'carbon-icons-svelte'
	import { Button } from 'carbon-components-svelte'
	import { goto } from '$app/navigation'
	import HeaderWalletAsset from './HeaderWalletAsset.svelte'

	let account = ''

	const walletSub = wallet.subscribe((wallet) => {
		account = wallet.account
	})
	const openWalletExplorer = () => {
		window.open(explorerAddressUrl('algo', account), '_blank')
	}
	const openPortfolio = () => {
		goto('/profile/assets')
	}

	onMount(syncWalletAssets)
	onDestroy(walletSub)
</script>

<div class="header-wallet">
	<div class="header-wallet__address" on:click={openWalletExplorer}>
		<div>
			<img src="/icons/algo.svg" alt="Algo" />
			{formatWallet(account, 6)}
		</div>
		<Launch16 />
	</div>

	<div class="header-wallet__assets">
		<HeaderWalletAsset unit="ALGO" />
		<HeaderWalletAsset unit="DPANDA" />
		<div class="header-wallet__view-all">
			<Button kind="tertiary" on:click={openPortfolio}>View all</Button>
		</div>
	</div>
</div>

<style lang="scss">
	.header-wallet {
		&__address {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0.625rem 1rem;
			min-height: 2.5rem;
			margin-bottom: 0.75rem;
			transition: background-color 70ms;
			border-radius: 5px;

			img {
				width: 0.875rem;
				height: 0.875rem;
				margin-right: 1rem;
				float: left;
			}

			&:hover {
				cursor: pointer;
				background-color: var(--dp--black-05);
			}
		}

		&__assets {
			padding: 0.5rem;
			border: 1px solid rgba(#fff, 0.25);
			border-radius: 5px;
		}

		&__view-all {
			margin-top: 0.5rem;

			:global(button) {
				text-align: center;
				justify-content: center;
				padding: 0.5rem 1rem;
				border-color: rgba(#fff, 0.25);
				width: 100%;
				min-height: 2.5rem;
			}
		}
	}
</style>

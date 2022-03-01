<script lang="ts">
	import { onDestroy, onMount } from 'svelte'
	import { wallet } from '../../../stores/wallet'
	import {
		checkWallet,
		onConnnectMyalgo,
		onConnectPera,
		onDisconnect
	} from '../../helper/walletConnect'

	import { Modal } from 'carbon-components-svelte'
	import { Button } from 'carbon-components-svelte'
	import { Logout16, Wallet16 } from 'carbon-icons-svelte'
	import { formatWallet } from '../../../$lib/helper/utils'

	let open = false
	let isConnected = false
	let account = ''

	const walletSub = wallet.subscribe((wallet) => {
		isConnected = wallet.isConnected
		open = false
		account = formatWallet(wallet.account)
	})
	onDestroy(walletSub)

	onMount(() => {
		checkWallet()
	})
</script>

<div class="connect-wallet">
	{#if isConnected}
		<div>
			{account} &nbsp;
			<Button kind="danger" icon={Logout16} on:click={() => onDisconnect()} />
		</div>
	{:else}
		<Button icon={Wallet16} label="Disconnect" on:click={() => (open = true)}>Connect</Button>
	{/if}
</div>

<Modal
	bind:open
	size="xs"
	passiveModal
	preventCloseOnClickOutside
	modalHeading="Sign in with Algorand"
	on:open
	on:close
	on:submit
>
	<div class="wallet-list">
		<div class="wallet-item" on:click={() => onConnectPera()}>
			<div class="wallet-item__icon">
				<img src="/images/logo-pera.png" alt="Pera" />
			</div>
			<div class="wallet-item__name">Pera Wallet</div>
		</div>

		<div class="wallet-item" on:click={() => onConnnectMyalgo()}>
			<div class="wallet-item__icon">
				<img src="/images/logo-myalgo.png" alt="MyAlgo" />
			</div>
			<div class="wallet-item__name">MyAlgo Wallet</div>
		</div>
	</div>
</Modal>

<style lang="scss">
	.wallet-list {
		margin-top: 2rem;

		.wallet-item {
			display: flex;
			align-items: center;
			padding: 0.75rem 1rem;
			background-color: #333;
			border-radius: 4px;
			margin-bottom: 1.75rem;
			transition: all 0.3s;

			&:last-child {
				margin-bottom: 0;
			}

			&:hover {
				cursor: pointer;
				background-color: #444;
			}

			&__icon {
				margin-right: 1rem;
				width: 2.5rem;
				height: 2.5rem;

				img {
					max-width: 100%;
				}
			}

			&__name {
				font-size: 1.25rem;
			}
		}
	}
</style>

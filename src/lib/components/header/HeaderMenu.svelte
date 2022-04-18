<script context="module" lang="ts">
	export const ssr = false
</script>

<script lang="ts">
	import { onDestroy } from 'svelte'
	import { goto } from '$app/navigation'
	import { wallet } from '../../../stores/wallet'
	import { onDisconnect } from '../../helper/walletConnect'
	import { formatWallet } from '$lib/helper/utils'
	import ConnectWallet from '../common/ConnectWallet.svelte'
	import HeaderWallet from './HeaderWallet.svelte'
	import HeaderNavItem from './HeaderNavItem.svelte'
	import { UserProfile, ShowDataCards, Settings, Logout } from 'carbon-icons-svelte'

	let isConnected = false
	let account = ''
	let isOpen = false

	const hoverMenuEnter = () => {
		isOpen = true
	}
	const hoverMenuExit = () => {
		isOpen = false
	}
	const hoverMenuToggle = () => {
		isOpen = !isOpen
	}

	const walletDisconnect = () => {
		hoverMenuExit()
		setTimeout(() => onDisconnect(), 300)
	}

	const navigate = (path: string) => {
		goto(path)
		hoverMenuExit()
	}

	const walletSub = wallet.subscribe((wallet) => {
		isConnected = wallet.isConnected
		account = formatWallet(wallet.account)
	})

	onDestroy(walletSub)
</script>

<div
	class="header-auth {isOpen ? 'open' : ''}"
	on:mouseenter={hoverMenuEnter}
	on:mouseleave={hoverMenuExit}
	on:click={hoverMenuToggle}
>
	<div class="header-auth__action">
		<ConnectWallet />
	</div>

	{#if isConnected && account}
		<div class="header-auth__dropdown">
			<div class="header-auth__dropdown__inner">
				<div><HeaderWallet /></div>

				<div class="header-nav">
					<HeaderNavItem
						icon={UserProfile}
						label="My Profile"
						action={() => navigate('/profile')}
					/>
					<HeaderNavItem
						icon={ShowDataCards}
						label="My Collections"
						action={() => navigate('/profile/collections')}
					/>
					<hr />
					<HeaderNavItem icon={Settings} label="Settings" action={() => navigate('/settings')} />
					<HeaderNavItem icon={Logout} label="Disconnect" action={walletDisconnect} />
				</div>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.header-auth {
		position: relative;
		z-index: 1000;

		&.open {
			.header-auth__dropdown {
				opacity: 1;
				visibility: visible;
				transform: translateY(0);
			}
		}
	}

	.header-auth__dropdown {
		position: absolute;
		top: 100%;
		right: 0;
		padding-top: 0.75rem;

		opacity: 0;
		visibility: hidden;
		transform: translateY(0.5rem);
		transition: all 0.3s;

		&__inner {
			display: flex;
			flex-direction: column;

			min-width: 320px;
			padding: 0.75rem;
			border-radius: 5px;
			background-color: var(--dp--black-04);

			> div {
				margin-bottom: 0.75rem;

				&:last-child {
					margin-bottom: 0;
				}
			}
		}
	}

	hr {
		opacity: 0.25;
		margin: 0.75rem 0;
		border-bottom-width: 0;
	}
</style>

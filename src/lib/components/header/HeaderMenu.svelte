<script lang="ts">
	import { onDestroy } from 'svelte'
	import { goto } from '$app/navigation'
	import { wallet } from '$lib/stores/wallet'
	import { onDisconnect } from '$lib/helper/walletConnect'
	import { formatWallet } from '$lib/helper/utils'
	import ConnectWallet from '../common/ConnectWallet.svelte'
	import HeaderWallet from './HeaderWallet.svelte'
	import HeaderNavItem from './HeaderNavItem.svelte'
	import UserProfile from 'carbon-icons-svelte/lib/UserProfile.svelte'
	import ShowDataCards from 'carbon-icons-svelte/lib/ShowDataCards.svelte'
	import Settings from 'carbon-icons-svelte/lib/Settings.svelte'
	import Logout from 'carbon-icons-svelte/lib/Logout.svelte'
	import Thumbnail_1 from 'carbon-icons-svelte/lib/Thumbnail_1.svelte'

	import HeaderSubscription from './HeaderSubscription.svelte'
	import { headerMenuEnter, headerMenuExit, isHeaderOpen } from '$lib/stores/header'

	let isConnected = false
	let account = ''

	const hoverMenuEnter = () => {
		headerMenuEnter()
	}

	const hoverMenuExit = () => {
		headerMenuExit()
	}

	const hoverMenuToggle = () => {
		if ($isHeaderOpen) {
			headerMenuExit()
		} else {
			headerMenuEnter()
		}
	}

	const walletDisconnect = () => {
		headerMenuExit()
		setTimeout(() => onDisconnect(), 300)
	}

	const navigate = (path: string) => {
		goto(path)
		setTimeout(() => headerMenuExit(), 100)
	}

	const walletSub = wallet.subscribe((wallet) => {
		isConnected = wallet.isConnected
		account = formatWallet(wallet.account)
	})

	onDestroy(walletSub)
</script>

<div
	class="header-auth {$isHeaderOpen ? 'open' : ''}"
	on:mouseenter={hoverMenuEnter}
	on:mouseleave={hoverMenuExit}
>
	<div class="header-auth__action" on:click={hoverMenuToggle}>
		<ConnectWallet />
	</div>

	{#if isConnected && account}
		<div class="header-auth__dropdown">
			<div class="header-auth__dropdown__inner">
				<div><HeaderWallet /></div>
				<div><HeaderSubscription /></div>
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
					<HeaderNavItem
						icon={Thumbnail_1}
						label="My Assets"
						action={() => navigate('/profile/assets')}
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

<script>
	import { wallet } from '$lib/stores/wallet'

	import ProfileBanner from '$lib/components/profile/ProfileBanner.svelte'
	import ProfileBannerSkeleton from '$lib/components/profile/ProfileBannerSkeleton.svelte'
	import WalletNotConnected from '$lib/components/common/WalletNotConnected.svelte'
	import { onMount, setContext } from 'svelte'
	import { writable } from 'svelte/store'
	import { operationStore, query } from '@urql/svelte'
	import { Q_GET_PROFILE } from '$lib/constants/queries'

	let isConnected
	let account

	const profileQuery = operationStore(Q_GET_PROFILE, undefined, { pause: true })
	const profileWallet = writable(null)
	const profileData = writable({
		wallet: null,
		display_name: null,
		handle: null,
		bio: null,
		avatar_cid: null,
		banner_cid: null
	})

	setContext('profile-wallet', profileWallet)
	setContext('profile-data', profileData)
	query(profileQuery)

	wallet.subscribe((w) => {
		isConnected = w.isConnected
		account = w.account
		$profileWallet = w.account

		$profileQuery.context.pause = false
		$profileQuery.variables = { wallet: w.account }
		$profileQuery.reexecute()
	})

	profileQuery.subscribe((p) => {
		if (p.data && p.data.profiles_by_pk) {
			const userProfile = p.data.profiles_by_pk
			profileData.set(userProfile)
		}
	})

	// // TODO hold a key for reexecution
	onMount(() => {
		profileQuery.reexecute({ requestPolicy: 'network-only' })
	})
</script>

<svelte:head>
	<title>Profile | DopePanda</title>
</svelte:head>

<div class="page page-profile">
	<div class="container">
		{#if isConnected && account}
			<ProfileBanner isSelf={true} isEditProfile={true} />

			<div class="profile-section">
				<slot />
			</div>
		{:else}
			<ProfileBannerSkeleton />
			<WalletNotConnected />
		{/if}
	</div>
</div>

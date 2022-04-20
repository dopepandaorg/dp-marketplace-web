<script>
	import ProfileBanner from '$lib/components/profile/ProfileBanner.svelte'
	import ProfileNavigation from '$lib/components/profile/ProfileNavigation.svelte'
	import { setContext } from 'svelte'
	import { writable } from 'svelte/store'
	import { operationStore, query } from '@urql/svelte'
	import { Q_GET_PROFILE, Q_GET_PROFILE_BY_HANDLE } from '$lib/constants/queries'
	import { page } from '$app/stores'
	import { isValidAlgoAddress } from '$lib/helper/algoClient'

	const handle = $page.params.handle
	const isValidAddress = isValidAlgoAddress(handle)
	const profileQuery = isValidAddress
		? operationStore(Q_GET_PROFILE, { wallet: handle })
		: operationStore(Q_GET_PROFILE_BY_HANDLE, { handle })

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

	profileQuery.subscribe((p) => {
		if (p.data && p.data.profiles_by_pk) {
			const userProfile = p.data.profiles_by_pk

			$profileWallet = userProfile.wallet
			profileData.set(userProfile)
		} else if (!p.fetching && isValidAddress) {
			profileData.set({
				...$profileData,
				wallet: handle
			})
		} else if (!p.fetching) {
			console.log('404 not found')
		}
	})
</script>

<svelte:head>
	<title>{$profileData.display_name || 'Profile'} | DopePanda</title>
</svelte:head>

<div class="page page-profile">
	<div class="container">
		<ProfileBanner />
		<ProfileNavigation basePath="/@{handle}" />

		<div class="profile-section">
			<slot />
		</div>
	</div>
</div>

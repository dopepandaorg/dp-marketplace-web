<script>
	import { page } from '$app/stores'
	import { operationStore, query } from '@urql/svelte'
	import { Q_GET_PROFILE, Q_GET_PROFILE_BY_HANDLE } from '../../$lib/constants/queries'
	import ProfileBanner from '../../$lib/components/profile/ProfileBanner.svelte'
	import ProfileBannerSkeleton from '../../$lib/components/profile/ProfileBannerSkeleton.svelte'
	import ProfileNavigation from '../../$lib/components/profile/ProfileNavigation.svelte'
	import ProfileContentSkeleton from '../../$lib/components/profile/ProfileContentSkeleton.svelte'
	import { isValidAlgoAddress } from '../../$lib/helper/algoClient'

	let isLoading = true
	let userProfile

	const handle = $page.params.handle
	const isValidAddress = isValidAlgoAddress(handle)
	const profile = isValidAddress
		? operationStore(Q_GET_PROFILE, { wallet: handle })
		: operationStore(Q_GET_PROFILE_BY_HANDLE, { handle })

	query(profile)

	profile.subscribe((p) => {
		isLoading = p.fetching

		if (p.data && p.data.profiles_by_pk) {
			userProfile = p.data.profiles_by_pk
		} else if (p.data && p.data.profiles) {
			userProfile = p.data.profiles.find((up) => up.handle === handle)
		}
	})
</script>

<svelte:head>
	<title>Public Profile | DopePanda</title>
</svelte:head>

<div class="page page-profile">
	<div class="container">
		{#if !isLoading && userProfile}
			<ProfileBanner
				name={userProfile.display_name}
				handle={userProfile.handle}
				wallet={userProfile.wallet}
			/>
			<ProfileNavigation basePath="/@{handle}" />

			<div class="profile-section">
				<slot />
			</div>
		{:else if isLoading}
			<ProfileBannerSkeleton />
			<ProfileNavigation basePath="/@{handle}" />
			<ProfileContentSkeleton />
		{/if}
	</div>
</div>

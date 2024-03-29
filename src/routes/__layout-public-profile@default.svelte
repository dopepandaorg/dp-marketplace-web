<script>
	import ProfileBanner from '$lib/components/profile/ProfileBanner.svelte'
	import ProfileNavigation from '$lib/components/profile/ProfileNavigation.svelte'
	import { setContext } from 'svelte'
	import { writable } from 'svelte/store'
	import { operationStore, query } from '@urql/svelte'
	import { Q_GET_PROFILE, Q_GET_PROFILE_BY_HANDLE } from '$lib/constants/queries'
	import { page } from '$app/stores'
	import { isValidAlgoAddress } from '$lib/helper/algoClient'
	import { InlineNotification } from 'carbon-components-svelte'

	const handle = $page.params.handle
	const isValidAddress = isValidAlgoAddress(handle)
	const profileQuery = isValidAddress
		? operationStore(Q_GET_PROFILE, { wallet: handle })
		: operationStore(Q_GET_PROFILE_BY_HANDLE, { handle })

	const profileWallet = writable(isValidAddress ? handle : null)
	const profileData = writable({
		wallet: null,
		display_name: null,
		handle: null,
		bio: null,
		avatar_cid: null,
		banner_cid: null
	})

	let isClaimed = true

	setContext('profile-wallet', profileWallet)
	setContext('profile-data', profileData)
	query(profileQuery)

	profileQuery.subscribe((p) => {
		if (p.data && p.data.profiles && Array.isArray(p.data.profiles) && p.data.profiles.length > 0) {
			const userProfile = p.data.profiles[0]

			$profileWallet = userProfile.wallet
			profileData.set(userProfile)

			isClaimed = true
		} else if (p.data && p.data.profiles_by_pk) {
			const userProfile = p.data.profiles_by_pk

			$profileWallet = userProfile.wallet
			profileData.set(userProfile)

			isClaimed = true
		} else if (!p.fetching && isValidAddress) {
			profileData.set({
				...$profileData,
				wallet: handle
			})

			isClaimed = false
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
			{#if !isClaimed}
				<div class="profile-section__alert">
					<InlineNotification
						kind="info"
						lowContrast
						hideCloseButton
						title="Unclaimed Profile"
						subtitle="This user profile has not been claimed. If you are the owner of this wallet, edit your profile to claim it."
					/>
				</div>
			{/if}

			<slot />
		</div>
	</div>
</div>

<style lang="scss">
	.profile-section__alert {
		margin-bottom: 4rem;

		:global(.bx--inline-notification) {
			max-width: none;
		}

		:global(.bx--inline-notification__text-wrapper) {
			flex-direction: column;
		}

		:global(.bx--inline-notification__subtitle) {
			margin-top: 1rem;
			font-size: 1rem;
		}
	}
</style>

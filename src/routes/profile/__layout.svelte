<script lang="ts" context="module">
	export const ssr = false
	import { authGuard } from '$lib/guards/auth'

	export async function load({ url }) {
		return authGuard({ url })
	}
</script>

<script>
	import { operationStore, query } from '@urql/svelte'
	import { wallet } from '../../stores/wallet'
	import { Q_GET_PROFILE } from '$lib/constants/queries'
	import ProfileBanner from '$lib/components/profile/ProfileBanner.svelte'
	import ProfileNavigation from '$lib/components/profile/ProfileNavigation.svelte'
	import ProfileBannerSkeleton from '$lib/components/profile/ProfileBannerSkeleton.svelte'
	import ProfileContentSkeleton from '$lib/components/profile/ProfileContentSkeleton.svelte'

	let isLoading = true
	let userProfile

	const profile = operationStore(Q_GET_PROFILE, { wallet: $wallet.account })
	query(profile)

	profile.subscribe((p) => {
		isLoading = p.fetching

		if (p.data && p.data.profiles_by_pk) {
			userProfile = p.data.profiles_by_pk
		} else {
			userProfile = {
				display_name: '',
				handle: '',
				wallet: $wallet.account
			}
		}
	})
</script>

<svelte:head>
	<title>Profile | DopePanda</title>
</svelte:head>

<div class="page page-profile">
	<div class="container">
		{#if !isLoading && userProfile}
			<ProfileBanner
				isSelf={userProfile.wallet === $wallet.account}
				name={userProfile.display_name}
				handle={userProfile.handle}
				wallet={userProfile.wallet}
			/>
			<ProfileNavigation />

			<div class="profile-section">
				<slot />
			</div>
		{:else if isLoading}
			<ProfileBannerSkeleton />
			<ProfileNavigation />
			<ProfileContentSkeleton />
		{/if}
	</div>
</div>

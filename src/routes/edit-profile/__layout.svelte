<script lang="ts" context="module">
	export const ssr = false
	import { authGuard } from '$lib/guards/auth'

	export async function load({ url }) {
		return authGuard({ url })
	}
</script>

<script>
	import { wallet } from '../../stores/wallet'
	import ProfileBanner from '$lib/components/profile/ProfileBanner.svelte'
	import ProfileBannerSkeleton from '$lib/components/profile/ProfileBannerSkeleton.svelte'
	import { fetchProfile, profile } from '../../stores/profile'

	let userProfile

	profile.subscribe((p) => {
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

	fetchProfile({ wallet: $wallet.account })
</script>

<svelte:head>
	<title>Profile | DopePanda</title>
</svelte:head>

<div class="page page-profile">
	<div class="container">
		{#if !$profile.fetching && userProfile}
			<ProfileBanner
				isEditProfile={true}
				name={userProfile.display_name}
				handle={userProfile.handle}
				wallet={userProfile.wallet}
			/>

			<div class="profile-section">
				<slot />
			</div>
		{:else if $profile.fetching}
			<ProfileBannerSkeleton />
		{/if}
	</div>
</div>

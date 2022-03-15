<script lang="ts" context="module">
	import { authGuard } from '../../$lib/guards/auth'
	export async function load({ url }) {
		return authGuard({ url })
	}

	export const ssr = false
</script>

<script>
	import ProfileBanner from '../../$lib/components/profile/ProfileBanner.svelte'
	import ProfileNavigation from '../../$lib/components/profile/ProfileNavigation.svelte'
</script>

<svelte:head>
	<title>Profile | DopePanda</title>
</svelte:head>

<div class="page page-profile">
	<div class="container">
		<ProfileBanner />
		<ProfileNavigation />

		<div class="profile-section">
			<slot />
		</div>
	</div>
</div>

<script>
	import ProfileBanner from '../../$lib/components/profile/ProfileBanner.svelte'
	import ProfileNavigation from '../../$lib/components/profile/ProfileNavigation.svelte'
</script>

<svelte:head>
	<title>Public Profile | DopePanda</title>
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

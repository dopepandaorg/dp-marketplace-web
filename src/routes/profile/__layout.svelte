<script>
</script>

<svelte:head>
	<title>Profile | DopePanda</title>
</svelte:head>

<div class="page page-profile">
	<div class="container">
		<div class="profile-header">
			<a href="/profile">Overview</a>
			<br />
			<a href="/profile/creations">Creations</a>
			<br />
			<a href="/profile/collections">Collections</a>
			<br />
			<a href="/profile/activity">Activity</a>
		</div>
	</div>

	<slot />
</div>

<style lang="scss">
	.page {
	}

	.profile-header {
	}
</style>

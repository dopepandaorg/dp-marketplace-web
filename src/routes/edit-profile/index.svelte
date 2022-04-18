<script>
	import EmptyPage from '$lib/components/common/EmptyPage.svelte'
</script>

<div class="edit-profile">
	<div class="container-sm">
		<h2>Edit Profile</h2>
		<EmptyPage
			icon="/images/restricted-access-icon.svg"
			title="Access Restricted"
			description="This feature is only available to Beta testers"
		/>
	</div>
</div>

<style lang="scss">
	.edit-profile {
		padding-top: 2rem;

		h2 {
			margin-bottom: 2rem;
		}
	}
</style>

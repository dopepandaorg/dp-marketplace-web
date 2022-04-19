<script lang="ts">
	import ProfileBio from '$lib/components/profile/ProfileBio.svelte'
	import ProfileSocialLinks from '$lib/components/profile/ProfileSocialLinks.svelte'
</script>

<div class="profile-overview">
	<ProfileBio />
	<ProfileSocialLinks />
</div>

<style lang="scss">
	.profile-overview {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;

		min-height: 300px;
	}
</style>

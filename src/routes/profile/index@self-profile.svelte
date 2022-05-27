<script lang="ts">
	import ProfileBio from '$lib/components/profile/ProfileBio.svelte'
	import ProfileShowcase from '$lib/components/profile/ProfileShowcase.svelte'
	import ProfileSocialLinks from '$lib/components/profile/ProfileSocialLinks.svelte'
</script>

<div class="profile-overview">
	<ProfileBio />
	<ProfileSocialLinks />
</div>

<div class="profile-content">
	<ProfileShowcase />
</div>

<style lang="scss">
	.profile-overview {
		display: grid;
		grid-template-columns: 1fr;
		gap: 4rem;

		@media screen and (min-width: 768px) {
			grid-template-columns: 1fr 1fr;
			min-height: 260px;
			gap: 4rem;
		}
	}

	.profile-content {
		padding-top: 4rem;
		border-top: 1px solid var(--dp--black-03);
	}
</style>

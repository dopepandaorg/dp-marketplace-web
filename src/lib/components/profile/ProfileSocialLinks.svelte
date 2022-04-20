<script lang="ts">
	import type { ProfileRecord } from '$lib/interfaces/profile'
	import { SkeletonPlaceholder } from 'carbon-components-svelte'
	import { Http, Launch, LogoInstagram, LogoTwitter } from 'carbon-icons-svelte'

	import { getContext } from 'svelte'
	import type { Writable } from 'svelte/store'
	import ProfileContentSkeleton from './ProfileContentSkeleton.svelte'
	import ProfileSocialLink from './ProfileSocialLink.svelte'

	let socialTwitter
	let socialInstagram
	let socialWebsite

	let isLoading = true

	const profileData = getContext<Writable<ProfileRecord>>('profile-data')
	profileData.subscribe((pd) => {
		isLoading = !pd.wallet

		socialTwitter = pd.social_twitter
		socialInstagram = pd.social_instagram
		socialWebsite = pd.social_website
	})
</script>

{#if isLoading}
	<div class="profile-social-links">
		<h4><SkeletonPlaceholder style="width: 200px; height: 1.5rem;" /></h4>

		<div class="social-links">
			<SkeletonPlaceholder style="width: 100%; height: 3.5rem;" />
			<SkeletonPlaceholder style="width: 100%; height: 3.5rem;" />
			<SkeletonPlaceholder style="width: 100%; height: 3.5rem;" />
		</div>
	</div>
{:else}
	<div class="profile-social-links">
		<h4>Social Links</h4>

		<div class="social-links">
			<ProfileSocialLink type="twitter" text={socialTwitter} />
			<ProfileSocialLink type="instagram" text={socialInstagram} />
			<ProfileSocialLink type="website" text={socialWebsite} />
		</div>
	</div>
{/if}

<style lang="scss">
	.profile-social-links {
		h4 {
			font-weight: bold;
		}
	}

	.social-links {
		display: grid;
		grid-template-columns: 1fr;
		margin-top: 1rem;
		gap: 2rem;
		
		@media screen and (min-width: 768px) {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>

<script lang="ts">
	import { getContext } from 'svelte'
	import type { Writable } from 'svelte/store'
	import { goto } from '$app/navigation'
	import { convertIPFSCIDToUrl } from '$lib/constants/assets'
	import type { ProfileRecord } from '$lib/interfaces/profile'
	import { Button, OverflowMenu, OverflowMenuItem } from 'carbon-components-svelte'
	import ArrowLeft from 'carbon-icons-svelte/lib/ArrowLeft.svelte'
	import Edit from 'carbon-icons-svelte/lib/Edit.svelte'
	import Share from 'carbon-icons-svelte/lib/Share.svelte'
	import ProfileAvatar from './ProfileAvatar.svelte'
	import ProfileAccountName from './ProfileAccountName.svelte'
	import ProfileBannerSkeleton from './ProfileBannerSkeleton.svelte'
	import { addToast } from '$lib/stores/toast'
	import ShareTwitter from '../common/ShareTwitter.svelte'

	export let isSelf = false
	export let isEditProfile = false

	let wallet
	let name
	let handle
	let avatar_cid
	let banner_cid

	const getProfileLink = () => {
		return window.location.protocol + '//' + window.location.host + '/@' + (handle || wallet)
	}

	const editProfile = () => {
		goto('/edit-profile')
	}

	const backToProfile = () => {
		goto('/profile')
	}

	const copyToClipboard = () => {
		const profileLink = getProfileLink()

		navigator.clipboard.writeText(profileLink).then(() => {
			addToast({
				kind: 'info',
				title: 'Copied!',
				subtitle: 'Link has been copied to the clipboard.'
			})
		})
	}

	const profileData = getContext<Writable<ProfileRecord>>('profile-data')
	profileData.subscribe((pd) => {
		wallet = pd.wallet
		name = pd.display_name
		handle = pd.handle
		avatar_cid = pd.avatar_cid
		banner_cid = pd.banner_cid
	})
</script>

{#if !wallet}
	<ProfileBannerSkeleton />
{:else}
	<div class="profile-banner__wrap">
		<div
			class="profile-banner"
			style={banner_cid && `background-image: url(${convertIPFSCIDToUrl(banner_cid)})`}
		>
			<div class="profile-banner__avatar">
				<ProfileAvatar {avatar_cid} identifier={wallet} />
			</div>
		</div>

		<div class="profile-meta">
			<div class="profile-meta__account">
				<ProfileAccountName {name} {handle} account={wallet} />
			</div>

			{#if !isEditProfile}
				<div class="profile-meta__action">
					{#if isSelf}
						<Button size="field" kind="secondary" on:click={editProfile} icon={Edit}
							>Edit Profile</Button
						>
					{/if}

					<OverflowMenu kind="secondary" icon={Share} flipped>
						<OverflowMenuItem text="Copy Link" on:click={copyToClipboard} />
						<OverflowMenuItem>
							<ShareTwitter
								text="Check out this amazing profile!"
								url={getProfileLink()}
								hashtags="dopepanda"
								via={null}
								related={null}>Share on Twitter</ShareTwitter
							>
						</OverflowMenuItem>
					</OverflowMenu>

					{#if !isSelf}
						<OverflowMenu kind="secondary" flipped>
							<OverflowMenuItem danger text="Report User" />
						</OverflowMenu>
					{/if}
				</div>
			{:else}
				<div class="profile-meta__action">
					<Button size="field" kind="secondary" on:click={backToProfile} icon={ArrowLeft}
						>Back to Profile</Button
					>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style lang="scss">
	.profile-banner__wrap {
		padding-bottom: 2rem;
	}

	.profile-meta {
		display: flex;
		flex-direction: column;
		align-items: center;

		padding: 2rem 0 0;

		@media screen and (min-width: 768px) {
			justify-content: space-between;
			flex-direction: row;
			padding: 0;
		}

		&__action {
			display: flex;
			margin-top: 1rem;

			@media screen and (min-width: 768px) {
				margin-top: 0;
			}

			> :global(button) {
				margin-left: 1rem;
				min-width: 3rem;
				min-height: 3rem;
				align-self: center;
				justify-content: center;

				&:first-child {
					margin-left: 0;
				}
			}

			:global(button.bx--overflow-menu) {
				background-color: var(--dp--black-04);
				border-radius: 5px;

				&:hover {
					background-color: var(--dp--black-05);
				}
			}
		}
	}

	.profile-banner {
		position: relative;

		display: flex;
		align-items: flex-end;
		justify-content: flex-end;

		width: 100%;
		height: 120px;
		border-radius: 10px;
		margin-bottom: 2rem;
		padding: 1rem;

		background: radial-gradient(50% 442.86% at 50% 100%, #420023 9.86%, #ff0089 92.25%);
		background-position: center;
		background-size: cover;

		@media screen and (min-width: 768px) {
			height: 150px;
		}
	}

	.profile-banner__avatar {
		position: absolute;
		left: 50%;
		top: 100%;
		transform: translate(-50%, -65%);

		:global(.profile-avatar) {
			@media screen and (max-width: 767px) {
				width: 100px !important;
				height: 100px !important;
			}
		}
	}
</style>

<script lang="ts">
	import { Button, OverflowMenu, OverflowMenuItem } from 'carbon-components-svelte'
	import { ArrowLeft, Edit, Share } from 'carbon-icons-svelte'
	import ProfileAvatar from './ProfileAvatar.svelte'
	import ProfileAccountName from './ProfileAccountName.svelte'
	import { goto } from '$app/navigation'

	export let name
	export let handle
	export let wallet
	export let isSelf = false
	export let isEditProfile = false

	const editProfile = () => {
		goto('/edit-profile')
	}

	const backToProfile = () => {
		goto('/profile')
	}
</script>

<div class="profile-banner__wrap">
	<div class="profile-banner">
		<div class="profile-banner__avatar">
			<ProfileAvatar identifier={wallet} />
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
				<Button size="field" kind="secondary" icon={Share} iconDescription="Share Profile" />
				<OverflowMenu kind="secondary" flipped>
					<OverflowMenuItem danger text="Report User" />
				</OverflowMenu>
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

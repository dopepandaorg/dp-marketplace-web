<script lang="ts">
	import { goto } from '$app/navigation'

	import { Q_GET_PROFILE_MINI } from '$lib/constants/queries'
	import { operationStore, query } from '@urql/svelte'
	import { SkeletonPlaceholder } from 'carbon-components-svelte'
	import ProfileAvatar from './ProfileAvatar.svelte'

	export let account: string
	export let size: number

	let name = null
	let avatarCID = null
	let handle = null

	const profileQuery = operationStore(Q_GET_PROFILE_MINI, { wallet: account })
	query(profileQuery)

	profileQuery.subscribe((p) => {
		if (p.data && p.data.profiles_by_pk) {
			const userProfile = p.data.profiles_by_pk
			name = userProfile.display_name
			avatarCID = userProfile.avatar_cid
			handle = userProfile.handle
		}
	})

	const goToProfile = (e: Event) => {
		e.stopPropagation()
		goto('/@' + account)
	}
</script>

<div class="profile-avatar" on:click={goToProfile}>
	<ProfileAvatar {size} avatar_cid={avatarCID} identifier={account} />

	{#if !$profileQuery.fetching && name}
		<div class="profile-avatar__meta">
			<div class="profile-avatar__name">
				{name}
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.profile-avatar {
		display: flex;

		&__name {
			font-size: 0.875rem;
			line-height: 1.5;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			padding-left: 1.5rem;
			padding-right: 1rem;

			:global(svg) {
				width: 1.25rem;
				height: 1.25rem;
				fill: #fff;
				float: none;
				margin-left: 0.75rem;
			}
		}

		&__meta {
			position: absolute;
			left: 100%;
			max-width: 0;
			height: 100%;
			background: linear-gradient(109.08deg, #fd9d5d 0%, #fd2ca0 49.53%, #3397ff 104.51%);
			box-shadow: 0 0 25px #2e2e2e;

			display: flex;
			align-items: center;
			margin-left: -1rem;

			z-index: -1;
			border-radius: 0 40px 40px 0;

			opacity: 0;
			visibility: hidden;
		}

		&:hover {
			cursor: pointer;

			.profile-avatar__meta {
				max-width: 180px;
				opacity: 1;
				visibility: visible;

				transition: all 0.3s;
			}
		}
	}
</style>

<script lang="ts">
	import { Q_GET_PROFILE_MINI } from '$lib/constants/queries'
	import { operationStore, query } from '@urql/svelte'
	import { SkeletonPlaceholder } from 'carbon-components-svelte'

	import IconVerified from '../../../../static/icons/verified-coloured.svg'
	import ProfileAvatar from './ProfileAvatar.svelte'

	export let account: string
	export let size: 'sm' | 'md' | 'lg' = 'md'

	let name = null
	let avatarCID = null
	let handle = null
	let isVerified = false

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
</script>

<div class="profile-handle">
	<ProfileAvatar size={32} avatar_cid={avatarCID} identifier={account} />

	{#if $profileQuery.fetching}
		<div class="profile-handle__meta">
			<SkeletonPlaceholder style="height: 20px" />
		</div>
	{:else if name || (name && handle)}
		<div class="profile-handle__meta">
			<div class="profile-handle__name">
				{name}

				{#if isVerified}
					<IconVerified />
				{/if}
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.profile-handle {
		display: flex;

		&__name {
			font-size: 1.125rem;
			display: flex;
			align-items: center;

			:global(svg) {
				width: 1.25rem;
				height: 1.25rem;
				fill: #fff;
				float: none;
				margin-left: 0.75rem;
			}
		}

		&__meta {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-left: 0.75rem;

			@media screen and (min-width: 768px) {
				flex-direction: row;
			}
		}

		&__handle {
			line-height: 1.3;
			margin-top: 0.5rem;

			@media screen and (min-width: 768px) {
				margin-left: 1rem;
				margin-top: 0;
			}
		}

		&__account {
			font-size: 1.125rem;
			display: flex;
			align-items: center;

			&.style-muted {
				font-size: 0.875rem;
				opacity: 0.5;
			}

			:global(button) {
				width: 1.5rem;
				height: 1.5rem;
				margin-left: 1rem;

				color: #fff;
				background-color: transparent;
			}
		}
	}
</style>

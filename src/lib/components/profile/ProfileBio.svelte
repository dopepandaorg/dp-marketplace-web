<script lang="ts">
	import type { ProfileRecord } from '$lib/interfaces/profile'
	import { InlineNotification, SkeletonPlaceholder } from 'carbon-components-svelte'
	import dayjs from 'dayjs'

	import { getContext } from 'svelte'
	import type { Writable } from 'svelte/store'
import ConnectWallet from '../common/ConnectWallet.svelte';

	let bio
	let joinedAt
	let isLoading = true

	const profileData = getContext<Writable<ProfileRecord>>('profile-data')
	profileData.subscribe((pd) => {
		isLoading = !pd.wallet

		bio = pd.bio
		joinedAt = pd.created_at
	})
</script>

{#if isLoading}
	<div>
		<div class="profile-bio">
			<h4><SkeletonPlaceholder style="width: 200px; height: 1.5rem;" /></h4>

			<div class="profile-bio__content">
				<SkeletonPlaceholder style="width: 100%; height: 5rem;" />
			</div>
		</div>

		<div class="profile-meta">
			<div class="profile-meta__item">
				<div class="profile-meta__item__label">
					<SkeletonPlaceholder style="width: 120px; height: 1.5rem;" />
				</div>
				<div class="profile-meta__item__value">
					<SkeletonPlaceholder style="width: 240px; height: 1.5rem;" />
				</div>
			</div>
		</div>
	</div>
{:else}
	<div>
		<div class="profile-bio">
			<h4>Bio</h4>

			{#if bio}
				<div class="profile-bio__content">
					{bio}
				</div>
			{:else}
				<InlineNotification
					kind="info"
					lowContrast
					hideCloseButton
					title="Unclaimed Profile"
					subtitle="This user profile has not been claimed. If you are the owner of this wallet, edit your profile to claim it."
				/>
			{/if}
		</div>

		{#if joinedAt}
			<div class="profile-meta">
				<div class="profile-meta__item">
					<div class="profile-meta__item__label"><h5>Joined</h5></div>
					<div class="profile-meta__item__value">{dayjs(joinedAt).format('DD MMMM, YYYY')}</div>
				</div>
			</div>
		{/if}
	</div>
{/if}

<style lang="scss">
	.profile-bio {
		h4 {
			font-weight: bold;
		}

		&__content {
			margin-top: 1rem;

			&.empty {
				opacity: 0.5;
			}
		}

		:global(.bx--inline-notification__text-wrapper) {
			flex-direction: column;
		}

		:global(.bx--inline-notification__subtitle) {
			margin-top: 1rem;
		}
	}

	.profile-meta {
		margin-top: 1rem;

		@media screen and (min-width: 768px) {
			margin-top: 4rem;
		}
	}

	.profile-meta__item {
		display: flex;
		align-items: center;
		padding: 0.5rem 0;

		&__label {
			margin-right: 2rem;
		}

		&__value {
			flex: 1;
		}
	}
</style>

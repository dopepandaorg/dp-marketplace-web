<script lang="ts">
	import { Button, IconSkeleton } from 'carbon-components-svelte'
	import ProfileAvatar from './ProfileAvatar.svelte'
	import ProfileAccountNameSkeleton from './ProfileAccountNameSkeleton.svelte'
</script>

<div class="profile-banner__wrap">
	<div class="profile-banner">
		<div class="profile-banner__avatar">
			<ProfileAvatar />
		</div>
	</div>

	<div class="profile-meta">
		<div class="profile-meta__account">
			<ProfileAccountNameSkeleton />
		</div>

		<div class="profile-meta__action">
			<Button size="field" kind="secondary" skeleton={true} />
			<Button size="field" kind="secondary" icon={IconSkeleton} skeleton={true} />
			<Button size="field" kind="secondary" icon={IconSkeleton} skeleton={true} />
		</div>
	</div>
</div>

<style lang="scss">
	.profile-banner__wrap {
		padding-bottom: 2rem;
	}

	.profile-meta {
		display: flex;
		justify-content: space-between;

		&__action {
			display: flex;

			> :global(.bx--btn) {
				margin-left: 1rem;
				min-width: 3rem;
				min-height: 3rem;
				align-self: center;
				justify-content: center;
			}

			:global(.bx--btn) {
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
		height: 150px;
		border-radius: 10px;
		margin-bottom: 2rem;
		padding: 1rem;

		background: radial-gradient(50% 442.86% at 50% 100%, #420023 9.86%, #ff0089 92.25%);
	}
	.profile-banner__avatar {
		position: absolute;
		left: 50%;
		top: 100%;
		transform: translate(-50%, -65%);
	}
</style>

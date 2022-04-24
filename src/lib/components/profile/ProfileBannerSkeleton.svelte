<script lang="ts">
	import { SkeletonPlaceholder } from 'carbon-components-svelte'
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
			<SkeletonPlaceholder style="width: 128px; height: 48px;" />
			<SkeletonPlaceholder style="width: 48px; height: 48px;" />
			<SkeletonPlaceholder style="width: 48px; height: 48px;" />
		</div>
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
			flex-direction: row;
			justify-content: space-between;
			padding: 0;
		}

		&__action {
			display: flex;
			margin-top: 1rem;

			@media screen and (min-width: 768px) {
				margin-top: 0;
			}

			> :global(.bx--skeleton__placeholder) {
				margin-left: 1rem;

				&:first-child {
					margin-left: 0;
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

<script lang="ts">
	import { SkeletonPlaceholder } from 'carbon-components-svelte'
	import CollectionDataPlaceholder from './CollectionDataPlaceholder.svelte'
</script>

<div class="collection-header__wrap">
	<div class="collection-header">
		<div class="collection-header__avatar">
			<div class="profile-avatar" style="width: 140px; height: 140px;" />
		</div>
	</div>

	<div class="collection-meta">
		<div class="collection-meta__account">
			<div class="collection-account-name">
				<SkeletonPlaceholder style="width: 18rem; height: 1.75rem; margin-bottom: 0.625rem;" />
				<SkeletonPlaceholder style="width: 10rem; height: 1.125rem;" />
			</div>
		</div>

		<div class="collection-meta__data">
			<CollectionDataPlaceholder />
		</div>

		<div class="collection-meta__action">
			<SkeletonPlaceholder style="width: 48px; height: 48px;" />
			<SkeletonPlaceholder style="width: 48px; height: 48px;" />
			<SkeletonPlaceholder style="width: 48px; height: 48px;" />
		</div>
	</div>
</div>

<style lang="scss">
	.collection-header__wrap {
		padding-bottom: 2rem;
	}

	.collection-account-name {
		overflow: hidden;
	}

	.profile-avatar {
		border-radius: 50%;
		width: 140px;
		height: 140px;
		box-shadow: 0 0 25px #2e2e2e;
		background: linear-gradient(109.08deg, #fd9d5d 0%, #fd2ca0 49.53%, #3397ff 104.51%);

		:global(svg) {
			width: 100%;
			height: auto;
			border-radius: 50%;
			float: left;
		}

		:global(img) {
			float: left;
			width: 100%;
			height: 100%;
			max-width: 100%;
			border-radius: 50%;
			object-fit: cover;
		}
	}

	.collection-meta {
		display: flex;
		flex-direction: column;
		padding: 2rem 0 0;

		@media screen and (min-width: 768px) {
			display: grid;
			grid-template-columns: 1fr 2fr 1fr;
			justify-content: space-between;
			flex-direction: row;
			padding: 0;
		}

		&__action {
			display: flex;
			justify-content: flex-end;
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

		&__data {
			display: flex;
			justify-content: center;
		}
	}

	.collection-header {
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

	.collection-header__avatar {
		position: absolute;
		left: 50%;
		top: 100%;
		transform: translate(-50%, -75%);

		:global(.profile-avatar) {
			@media screen and (max-width: 767px) {
				width: 100px !important;
				height: 100px !important;
			}
		}
	}
</style>

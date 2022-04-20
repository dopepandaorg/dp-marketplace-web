<script lang="ts">
	import { onMount } from 'svelte'
	import { ImageLoader, SkeletonPlaceholder } from 'carbon-components-svelte'
	import { convertIPFSUrl } from '$lib/constants/assets'
	import ProfileAvatar from '../profile/ProfileAvatar.svelte'

	export let id

	let asset
	let isLoading = false

	onMount(() => {
		isLoading = true

		fetch(`/api/assets/${id}.json`)
			.then((response) => response.json())
			.then((a) => (asset = a))
			.finally(() => (isLoading = false))
	})
</script>

<div class="asset-tile">
	{#if isLoading}
		<div class="asset-tile__inner">
			<div class="asset-tile__image">
				<SkeletonPlaceholder style="width: 100%; height: 300%" />
			</div>
		</div>
	{:else if !!asset}
		<div class="asset-tile__inner">
			<div class="asset-tile__image">
				<ImageLoader fadeIn src={convertIPFSUrl(asset.url)} />
			</div>
			<div class="asset-tile__content">
				<div class="asset-tile__creator-avatar">
					<ProfileAvatar identifier={asset.creator} size={40} />
				</div>

				<div class="asset-tile__title">{asset.name}</div>

				<!-- <div class="asset-tile__collection">
					<div class="asset-tile__collection__badge" />
					<div class="asset-tile__collection__name">Collection Name</div>
				</div> -->

				<!-- <div class="asset-tile__meta">
					<div class="asset-tile__meta-item">
						<div class="asset-tile__meta-item__label">
							Label
						</div>
						<div class="asset-tile__meta-item__value">
							Value
						</div>
					</div>
				</div> -->

				<!-- <div class="asset-tile__action">
					<Button>Abc</Button>
				</div> -->
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.asset-tile {
		position: relative;
		display: flex;
		align-items: center;
		border-radius: 5px;
		min-width: 0;

		background-color: var(--dp--black-02);

		&__inner {
			display: flex;
			flex-direction: column;
			width: 100%;
		}

		&__image {
			position: relative;
			width: 100%;
			border-radius: 5px 5px 0 0;
			overflow: hidden;
			padding-top: 125%;

			:global(img) {
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;

				max-width: 100%;
				height: 100%;
				object-fit: cover;
				object-position: center;

				transition: transform 0.3s;
			}
		}

		&__content {
			position: relative;
			width: 100%;
			min-height: 120px;
			top: -4rem;
			transform: translateY(4rem);
			padding: 2.25rem 1.25rem 1.25rem;

			background-color: var(--dp--black-03);
			transition: transform 0.125s;
		}

		&__creator-avatar {
			position: absolute;
			top: 0;

			width: 2rem;
			height: 2rem;

			transform: translateY(-60%);
		}

		&__title {
			font-size: 1.375rem;
			font-weight: 500;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		&__collection {
			margin-top: 0.75rem;
			display: flex;
			align-items: center;

			&__badge {
				background-color: var(--dp--black-05);
				border-radius: 5px;
				width: 1.75rem;
				height: 1.75rem;
				margin-right: 0.75rem;
			}
		}

		&__meta {
			margin-top: 1rem;

			display: flex;
			justify-content: space-between;
		}

		&:hover {
			cursor: pointer;

			// .asset-tile__content {
			// 	transform: translateY(0);
			// }

			.asset-tile__image {
				:global(img) {
					transform: scale(1.05);
				}
			}
		}
	}
</style>

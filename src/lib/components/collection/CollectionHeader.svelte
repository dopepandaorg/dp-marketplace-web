<script lang="ts">
	import { getContext } from 'svelte'
	import type { Writable } from 'svelte/store'
	import { goto } from '$app/navigation'
	import { convertIPFSCIDToUrl } from '$lib/constants/assets'
	import { Button, ImageLoader, OverflowMenu, OverflowMenuItem } from 'carbon-components-svelte'
	import ArrowLeft from 'carbon-icons-svelte/lib/ArrowLeft.svelte'
	import Edit from 'carbon-icons-svelte/lib/Edit.svelte'
	import Share from 'carbon-icons-svelte/lib/Share.svelte'

	import { addToast } from '$lib/stores/toast'
	import ShareTwitter from '../common/ShareTwitter.svelte'

	import type { CollectionRecord } from '$lib/interfaces/collection'

	export let isEditCollection = false

	let id
	let title
	let slug
	let avatar_cid
	let banner_cid

	const getCollectionLink = () => {
		return window.location.protocol + '//' + window.location.host + '/' + (slug || id)
	}

	const editCollection = () => {
		goto(`/collections/${slug || id}/edit`)
	}

	const backToCollection = () => {
		goto(`/collections/${slug || id}`)
	}

	const copyToClipboard = () => {
		const profileLink = getCollectionLink()

		navigator.clipboard.writeText(profileLink).then(() => {
			addToast({
				kind: 'info',
				title: 'Copied!',
				subtitle: 'Link has been copied to the clipboard.'
			})
		})
	}

	const collectionData = getContext<Writable<CollectionRecord>>('collection-data')
	collectionData.subscribe((cd) => {
		if (cd) {
			id = cd.id
			title = cd.title
			slug = cd.slug
			avatar_cid = cd.avatar_cid
			banner_cid = cd.banner_cid
		}
	})
</script>

<div class="collection-header__wrap">
	<div
		class="collection-header"
		style={banner_cid && `background-image: url(${convertIPFSCIDToUrl(banner_cid)})`}
	>
		<div class="collection-header__avatar">
			<div class="profile-avatar">
				<ImageLoader src={convertIPFSCIDToUrl(avatar_cid)} />
			</div>
		</div>
	</div>

	<div class="collection-meta">
		<div class="collection-meta__account">
			<div class="collection-meta__name">
				{title}
			</div>
		</div>

		{#if !isEditCollection}
			<div class="collection-meta__action">
				<Button size="field" kind="secondary" on:click={editCollection} icon={Edit}
					>Edit Collection</Button
				>

				<OverflowMenu kind="secondary" icon={Share} flipped>
					<OverflowMenuItem text="Copy Link" on:click={copyToClipboard} />
					<OverflowMenuItem>
						<ShareTwitter
							text="Check out this amazing profile!"
							url={getCollectionLink()}
							hashtags="dopepanda"
							via={null}
							related={null}>Share on Twitter</ShareTwitter
						>
					</OverflowMenuItem>
				</OverflowMenu>
			</div>
		{:else}
			<div class="collection-meta__action">
				<Button size="field" kind="secondary" on:click={backToCollection} icon={ArrowLeft}
					>Back to Profile</Button
				>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.collection-header__wrap {
		padding-bottom: 2rem;
	}

	.collection-meta {
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

		&__account {
		}

		&__name {
			font-size: 1.5rem;
			font-weight: bold;
		}
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
		background-position: center;
		background-size: cover;

		@media screen and (min-width: 768px) {
			height: 150px;
		}
	}

	.collection-header__avatar {
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

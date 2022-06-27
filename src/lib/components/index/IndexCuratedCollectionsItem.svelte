<script lang="ts">
	import { Button, ImageLoader, Link } from 'carbon-components-svelte'
	import Globe from 'carbon-icons-svelte/lib/Wikis.svelte'
	import LogoDiscord from 'carbon-icons-svelte/lib/LogoDiscord.svelte'
	import LogoTwitter from 'carbon-icons-svelte/lib/LogoTwitter.svelte'
	import ArrowRight from 'carbon-icons-svelte/lib/ArrowRight.svelte'
	import { convertIPFSCIDToUrl } from '$lib/constants/assets'

	import AssetTile from '../common/AssetTile.svelte'
	import { operationStore, query } from '@urql/svelte'
	import type { CollectionRecord } from '$lib/interfaces/collection'
	import { Q_GET_COLLECTION } from '$lib/constants/queries'

	export let id
	export let featuredAssets = []
	let collectionData: CollectionRecord = null
	const collectionQuery = operationStore(Q_GET_COLLECTION, { id })

	query(collectionQuery)

	collectionQuery.subscribe((c) => {
		if (c.data) {
			collectionData = c.data.collections_by_pk
		}
	})
</script>

{#if !$collectionQuery.fetching && collectionData}
	<div class="curated-collection-item">
		<div class="curated-collection-item__content">
			<div class="curated-collection-item__meta">
				<div class="curated-collection-item__avatar">
					<ImageLoader src={convertIPFSCIDToUrl(collectionData.avatar_cid)} />
				</div>
				<div class="curated-collection-item__title">{collectionData.title}</div>
				<div class="curated-collection-item__description">{collectionData.description}</div>
			</div>

			<div class="curated-collection-item__action">
				<div class="curated-collection-item__links">
					{#if collectionData.social_discord}
						<Link href={collectionData.social_discord} target="_blank">
							<LogoDiscord />
							{collectionData.social_discord}
						</Link>
					{/if}
					{#if collectionData.social_twitter}
						<Link href={'https://twitter.com/' + collectionData.social_twitter}>
							<LogoTwitter />
							{collectionData.social_twitter}
						</Link>
					{/if}
					{#if collectionData.social_website}
						<Link href={collectionData.social_website}>
							<Globe />
							{collectionData.social_website}
						</Link>
					{/if}
				</div>

				<a href="/collections/{collectionData.slug || collectionData.id}">
					<Button kind="tertiary" icon={ArrowRight}>View Collection</Button>
				</a>
			</div>
		</div>

		<div class="curated-collection-item__assets">
			{#each featuredAssets as a}
				<AssetTile id={a} />
			{/each}
		</div>
	</div>
{/if}

<style lang="scss">
	.curated-collection-item {
		display: grid;
		grid-template-columns: 320px 1fr;
		padding: 2rem;
		gap: 4rem;
		margin-bottom: 4rem;
		border-radius: 0.5rem;

		min-height: 500px;

		background-color: #50a3a830;

		&__assets {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			gap: 1.5rem;
			align-items: center;
		}

		&__content {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}

		&__avatar {
			width: 4rem;
			height: 4rem;
			margin-bottom: 1.5rem;

			border-radius: 0.5rem;

			:global(img) {
				width: 100%;
				height: 100%;
				border-radius: 0.5rem;
			}
		}

		&__title {
			font-size: 2.25rem;
			margin-bottom: 1rem;
		}

		&__description {
			line-height: normal;
		}

		&__links {
			display: flex;
			flex-direction: column;

			:global(a) {
				display: flex;
				align-items: center;
				margin-top: 1rem;
			}

			:global(svg) {
				width: 1.25rem;
				height: 1.25rem;
				float: left;
				margin-right: 0.5rem;
			}
		}

		&__action {
			:global(button) {
				margin-top: 2rem;
				width: 100%;
			}
		}
	}
</style>

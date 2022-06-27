<script context="module" lang="ts">
	/** @type {import('./[id]').Load} */
	export async function load({ params, fetch }) {
		const url = `/api/assets/${params.id}.json`
		const response = await fetch(url)

		return {
			status: response.status,
			props: {
				asset: response.ok && (await response.json())
			}
		}
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import Share from 'carbon-icons-svelte/lib/Share.svelte'
	import { OverflowMenu, OverflowMenuItem } from 'carbon-components-svelte'
	import type { AssetMetadata, AssetRecord } from '$lib/interfaces/asset'
	import AssetMediaBanner from '$lib/components/asset/AssetMediaBanner.svelte'
	import AssetDetailCollection from '$lib/components/asset/AssetDetailCollection.svelte'
	import AssetDetailMeta from '$lib/components/asset/AssetDetailMeta.svelte'
	import ShareTwitter from '$lib/components/common/ShareTwitter.svelte'
	import { addToast } from '$lib/stores/toast'
	import { AssetMetadataStandard } from '$lib/constants/enums'
	import { unSlugify } from '$lib/helper/stringUtils'
	import CreateEscrowListingTx from '$lib/components/transactions/CreateEscrowListingTx.svelte'
	import { operationStore, query } from '@urql/svelte'
	import { Q_GET_ESCROW_LISTING } from '$lib/constants/queries'
	import BuyEscrowTx from '$lib/components/transactions/BuyEscrowTx.svelte'
	import { wallet } from '$lib/stores/wallet'
import RemoveEscrowListingTx from '$lib/components/transactions/RemoveEscrowListingTx.svelte';

	export let asset: AssetRecord
	export let assetMetadata: AssetMetadata = {
		standard: AssetMetadataStandard.ARC69
	}

	let isOwner
	let escrowListing = null

	const escrowListingQuery = operationStore(
		Q_GET_ESCROW_LISTING,
		{ id: asset.id }
	)

	if (asset.id) {
		query(escrowListingQuery)
	}

	escrowListingQuery.subscribe((e) => {
		if (e.data && e.data.escrow_listings.length > 0) {
			escrowListing = e.data.escrow_listings[0]
		}
	})

	wallet.subscribe(w => {
		isOwner = w.assets.findIndex((wa) => wa.amount >= 1 && wa.id === asset.id) !== -1
	})

	const fetchMetadata = () => {
		fetch(`/api/assets/${$page.params.id}/metadata.json`)
			.then((response) => response.json())
			.then((body) => (assetMetadata = body))
	}

	const getLink = () => {
		return window.location.href
	}

	const copyToClipboard = () => {
		const profileLink = getLink()

		navigator.clipboard.writeText(profileLink).then(() => {
			addToast({
				kind: 'info',
				title: 'Copied!',
				subtitle: 'Link has been copied to the clipboard.'
			})
		})
	}

	onMount(() => {
		fetchMetadata()
	})
</script>

<svelte:head>
	<title>{asset.name} | DopePanda</title>
	<meta name="description" content={assetMetadata && assetMetadata.description} />
</svelte:head>

<div class="asset-detail">
	<div class="asset-detail__banner"><AssetMediaBanner assetUrl={asset.url} /></div>

	<div class="asset-detail__content">
		<div class="container-sm">
			<div class="asset-detail__content-inner">
				<div class="asset-detail__intro">
					<div class="asset-detail__title-wrap">
						<h2 class="asset-detail__title">{asset.name}</h2>

						<div class="asset-detail__share">
							<OverflowMenu kind="secondary" icon={Share} flipped>
								<OverflowMenuItem text="Copy Link" on:click={copyToClipboard} />
								<OverflowMenuItem>
									<ShareTwitter
										text="{asset.name} on DopePanda"
										url={getLink()}
										hashtags="dopepanda"
										via={null}
										related={null}>Share on Twitter</ShareTwitter
									>
								</OverflowMenuItem>
							</OverflowMenu>
						</div>
					</div>

					<div class="asset-detail__collection">
						<AssetDetailCollection id={asset.id} creator={asset.creator} />
					</div>

					<div class="asset-detail__meta">
						<div class="asset-detail__timestamp">
							<AssetDetailMeta {asset} />
						</div>
					</div>

					{#if escrowListing && !isOwner}
						<div class="asset-detail__listing">
							<h3>Listing</h3>
							
							<div class="asset-detail__buy">
								<div class="asset-detail__buy-price">
									{escrowListing.sale_price} <img src="/icons/algo.svg" alt="Algo" />
								</div>
								<div>
									<BuyEscrowTx
										escrowId={escrowListing.id}
										assetId={asset.id}
										unitPrice={escrowListing.sale_price}
										creator={escrowListing.creator}
										applicationId={escrowListing.application_id}
									/>
								</div>
							</div>
						</div>
					{:else if escrowListing && isOwner}
						<div class="asset-detail__listing">
							<h3>Listing</h3>
							<RemoveEscrowListingTx assetId={asset.id} />
						</div>
					{:else if !escrowListing && isOwner}
						<div class="asset-detail__listing">
							<h3>Listing</h3>
							<CreateEscrowListingTx assetId={asset.id} />
						</div>
					{/if}

					<div class="asset-detail__description">
						<h3>Description</h3>
						{#if assetMetadata && assetMetadata.description}
							{assetMetadata.description}
						{:else}
							<div class="empty">No description set</div>
						{/if}
					</div>

					<div class="asset-detail__attributes">
						<h3>Attributes</h3>
						{#if assetMetadata && assetMetadata.properties && Object.keys(assetMetadata.properties).length > 0}
							<div class="asset-detail__attributes__inner">
								{#each Object.entries(assetMetadata.properties) as [key, value]}
									<div class="asset-detail__attribute">
										<div class="asset-detail__attribute__key">{unSlugify(key)}</div>
										<div class="asset-detail__attribute__value">{unSlugify(value)}</div>
									</div>
								{/each}
							</div>
						{:else}
							<span class="empty">No attributes set</span>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.asset-detail {
		&__intro {
			> div {
				margin-top: 2.5rem;

				&:first-child {
					margin-top: 0;
				}

				@media screen and (min-width: 768px) {
				}
			}
		}

		h3 {
			font-size: 1.125rem;
			line-height: 1.5;
			font-weight: bold;
			margin-bottom: 1rem;

			border-bottom: 2px solid #ffffff69;
			padding-bottom: 0.5rem;
		}

		&__title {
			font-weight: 500;

			@media screen and (min-width: 768px) {
				font-size: 2.75rem;
				flex: 4;
			}
		}

		&__title-wrap {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		&__share {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: flex-end;
		}

		&__share {
			:global(button.bx--overflow-menu) {
				background-color: var(--dp--black-04);
				border-radius: 5px;

				&:hover {
					background-color: var(--dp--black-05);
				}
			}
		}

		&__collection {
			margin-top: 1.5rem !important;
		}

		&__description {
			font-size: 1rem;

			h3 {
				margin-bottom: 1rem;
			}
		}

		&__attributes {
			&__inner {
				border: 1px solid #fff;
				border-radius: 4px;
				padding-top: 0.5rem;
				padding-bottom: 0.5rem;
			}
		}

		&__attribute {
			display: grid;
			align-items: center;
			grid-template-columns: 1fr 1fr;
			padding: 1rem 1.25rem;
			border-bottom: 1px solid var(--dp--black-03);

			&__key {
				font-weight: 500;
				text-transform: capitalize;
			}

			&:last-child {
				border-bottom: 0;
				text-transform: capitalize;
			}
		}

		&__buy {
			display: grid;
			grid-template-columns: 1fr 1fr;
		}

		&__buy-price {
			font-size: 2.75rem;
			font-weight: bold;
			display: flex;
			align-items: center;

			img {
				width: 1rem;
				margin-left: 0.5rem;
			}
		}
	}

	.asset-detail__title {
		font-weight: 500;
	}

	.asset-detail__content {
		padding: 4rem 0;
	}

	.asset-detail__content-inner {
		padding: 0 1rem;
		display: grid;
		grid-template-columns: 1fr;
		gap: 4rem;
	}

	.asset-detail_listing {
		height: 200px;
	}

	.empty {
		font-size: 1rem;
		color: var(--dp--text-05);
	}
</style>

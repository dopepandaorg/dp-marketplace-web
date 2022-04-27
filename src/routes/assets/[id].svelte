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
	import type { AssetMetadataRecord, AssetRecord } from '$lib/interfaces/asset'
	import AssetMediaBanner from '$lib/components/asset/AssetMediaBanner.svelte'
	import AssetCollection from '$lib/components/asset/AssetCollection.svelte'
	import AssetDetailMeta from '$lib/components/asset/AssetDetailMeta.svelte'
	import CreateEscrowListingTx from '$lib/components/transactions/CreateEscrowListingTx.svelte'
import BuyEscrowTx from '$lib/components/transactions/BuyEscrowTx.svelte'

	export let asset: AssetRecord
	export let assetMetadata: AssetMetadataRecord = {}

	const fetchMetadata = () => {
		fetch(`/api/assets/${$page.params.id}/metadata.json`)
			.then((response) => response.json())
			.then((body) => (assetMetadata = body))
	}

	onMount(() => {
		fetchMetadata()
	})
</script>

<svelte:head>
	<title>{asset.name} | DopePanda</title>
</svelte:head>

<div class="asset-detail">
	<div class="asset-detail__banner"><AssetMediaBanner assetUrl={asset.url} /></div>

	<div class="asset-detail__content">
		<div class="container">
			<div class="asset-detail__content-inner">
				<div class="asset-detail__intro">
					<h2 class="asset-detail__title">{asset.name}</h2>
					<div class="asset-detail__meta">
						<AssetDetailMeta {asset} />
					</div>

					<div class="asset-detail__collection">
						<AssetCollection id={asset.id} creator={asset.creator} />
					</div>

					<div class="asset-detail__description">
						<h3>Description</h3>
						{#if assetMetadata && assetMetadata.description}
							{assetMetadata.description}
						{:else}
							No description set
						{/if}
					</div>

					<div class="asset-detail__attributes">
						<h3>Attributes</h3>
						{#if assetMetadata && assetMetadata.properties}
							<div class="asset-detail__attributes__inner">
								{#each Object.entries(assetMetadata.properties) as [key, value]}
									<div class="asset-detail__attribute">
										<div class="asset-detail__attribute__key">{key}</div>
										<div class="asset-detail__attribute__value">{value}</div>
									</div>
								{/each}
							</div>
						{:else}
							No attributes set
						{/if}
					</div>
				</div>

				<div class="asset-detail_listing">
					1. Listing 2. Sales
					<br/>
					<br/>
					<CreateEscrowListingTx assetId={asset.id}/>
					<br/>
					<br/>
					<BuyEscrowTx assetId={asset.id}/>
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
			}

			h3 {
				font-size: 1.125rem;
				font-weight: bold;
				margin-bottom: 1rem;
			}
		}

		&__title {
			font-size: 2.75rem;
			font-weight: 500;
		}
		
        &__meta {
            margin-top: 1rem !important;
		}

		&__collection {
		}

		&__description {
			font-size: 1rem;
			margin-bottom: 3rem;

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
			}

			&:last-child {
				border-bottom: 0;
			}
		}
	}

	.asset-detail__title {
		font-weight: 500;
	}

	.asset-detail__created {
	}

	.asset-detail__content {
		padding: 4rem 0;
	}

	.asset-detail__content-inner {
		padding: 0 1rem;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
	}

	.asset-detail_listing {
		height: 200px;
	}
</style>

<script lang="ts">
	import { inview } from 'svelte-inview'
	import { Button, ImageLoader, InlineLoading, SkeletonPlaceholder } from 'carbon-components-svelte'
	import { goto } from '$app/navigation'
	import { convertIPFSUrlOnly } from '$lib/constants/assets'
	import ProfileAvatar from '../profile/ProfileAvatar.svelte'
	import { explorerUrl, formatWallet } from '$lib/helper/utils'

	import { wallet } from '$lib/stores/wallet'
	import type { AssetRecord } from '$lib/interfaces/asset'
	import CreateEscrowListingTx from '../transactions/CreateEscrowListingTx.svelte'

	import IconIPFS from '../../../../static/icons/ipfs.svg'
	import IconAlgoExplorer from '../../../../static/icons/algoexplorer.svg'
	import { Q_GET_ESCROW_LISTING } from '$lib/constants/queries'
	import { operationStore, query } from '@urql/svelte'

	import BuyEscrowTx from '../transactions/BuyEscrowTx.svelte'
	import RemoveEscrowListingTx from '../transactions/RemoveEscrowListingTx.svelte'
	import ConnectWallet from './ConnectWallet.svelte'
	import { escape_object } from 'svelte/internal'

	export let id
	export let amount: number = null
	export let showCollection = false
	export let showListing = false

	let asset
	let escrowListing = null
	let isLoading = true
	let isInView = false

	let imageLoader
	let imageLoaderError

	let isOwner
	let isCreator
	let isOpen = false
	let walletIsConnected = false

	wallet.subscribe((w) => {
		walletIsConnected = w.isConnected
	})

	const escrowListingQuery = operationStore(
		Q_GET_ESCROW_LISTING,
		{ id },
		{ requestPolicy: 'cache-only' }
	)

	if (id) {
		query(escrowListingQuery)
	}

	escrowListingQuery.subscribe((e) => {
		if (e.data && e.data.escrow_listings.length > 0) {
			escrowListing = e.data.escrow_listings[0]

			if (escrowListing && escrowListing.seller === $wallet.account) {
				showListing = true
			}
		}
	})

	const goToAsset = (e: Event) => {
		e.preventDefault()
		goto('/assets/' + id)
	}

	const openIpfs = (e: Event) => {
		e.stopPropagation()

		if (asset.url) {
			window.open(convertIPFSUrlOnly(asset.url), '_blank')
		}
	}

	const openAlgoExplorer = (e: Event) => {
		e.stopPropagation()
		window.open(explorerUrl('algo', `/asset/${id}`), '_blank')
	}

	const loadData = () => {
		if (!id) return

		setTimeout(() => {
			isLoading = true

			if (isInView) {
				escrowListingQuery.reexecute({ requestPolicy: 'network-only' })

				fetch(`/api/assets/${id}.json`)
					.then((response) => response.json())
					.then((a: AssetRecord) => {
						asset = a

						if ($wallet.account) {
							isCreator = a.creator === $wallet.account
							isOwner = $wallet.assets.findIndex((wa) => wa.amount >= 1 && wa.id === a.id) !== -1
						}
					})
					.finally(() => (isLoading = false))
			}
		}, 100)
	}

	let isActionable = false

	$: {
		isActionable =
			(escrowListing && !isOwner) || (escrowListing && isOwner) || (!escrowListing && isOwner)
	}
</script>

{#if isLoading || $escrowListingQuery.fetching}
	<div
		class="asset-tile"
		use:inview
		on:change={(e) => (isInView = e.detail.inView)}
		on:enter={() => loadData()}
	>
		<div class="asset-tile__inner">
			<div class="asset-tile__image">
				<SkeletonPlaceholder style="position: absolute; top: 0; width: 100%; height: 100%;" />
			</div>
			<div class="asset-tile__content">
				<div class="asset-tile__title-wrap">
					<div class="asset-tile__creator-avatar" style="border-radius: 50%; overflow: hidden;">
						<SkeletonPlaceholder style="width: 40px; height: 40px;" />
					</div>

					<div class="asset-tile__title">
						<SkeletonPlaceholder style="width: 120px; height: 2rem" />
					</div>
				</div>

				<div class="asset-tile__meta">
					<div class="asset-tile__meta-item">
						<div class="asset-tile__meta-item__label">Unit</div>
						<div class="asset-tile__meta-item__value">
							<SkeletonPlaceholder style="width: 60px; height: 1rem" />
						</div>
					</div>
					{#if amount !== null}
						<div class="asset-tile__meta-item">
							<div class="asset-tile__meta-item__label">Qty</div>
							<div class="asset-tile__meta-item__value">
								<SkeletonPlaceholder style="width: 60px; height: 1rem" />
							</div>
						</div>
					{/if}
					{#if showListing}
						<div class="asset-tile__meta-item">
							<div class="asset-tile__meta-item__label">Listing</div>
							<div class="asset-tile__meta-item__value">
								<SkeletonPlaceholder style="width: 60px; height: 1rem" />
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
{:else if !!asset && asset.isNFT}
	<div
		use:inview
		class="asset-tile"
		class:unowned={amount === 0 && !showListing}
		class:actionable={isActionable}
		class:open={isOpen}
		on:change={() => (isInView = !isInView)}
	>
		<div class="asset-tile__inner">
			<div class="asset-tile__image" on:click={goToAsset}>
				<ImageLoader
					fadeIn
					bind:this={imageLoader}
					bind:error={imageLoaderError}
					src={convertIPFSUrlOnly(asset.url)}
				>
					<svelte:fragment slot="loading">
						<div class="asset-tile__image__inner">
							<InlineLoading />
						</div>
					</svelte:fragment>
					<svelte:fragment slot="error">
						<div class="asset-tile__image__inner">
							<Button
								kind="ghost"
								on:click={(e) => {
									e.preventDefault()
									e.stopPropagation()
									imageLoader.loadImage(convertIPFSUrlOnly(asset.url))
								}}
							>
								Error. Try again
							</Button>
						</div>
					</svelte:fragment>
				</ImageLoader>
			</div>
			<div class="asset-tile__content">
				<div class="asset-tile__title-wrap" on:click={goToAsset}>
					<div class="asset-tile__creator-avatar">
						<ProfileAvatar identifier={asset.creator} size={40} />
					</div>

					<div class="asset-tile__title">{asset.name}</div>

					<div class="asset-tile__links">
						<Button
							size="small"
							kind="secondary"
							icon={IconIPFS}
							iconDescription="View on IPFS"
							on:click={openIpfs}
						/>
						<Button
							size="small"
							kind="secondary"
							icon={IconAlgoExplorer}
							iconDescription="View on Algo Explorer"
							tooltipAlignment="end"
							on:click={openAlgoExplorer}
						/>
					</div>
				</div>

				{#if showCollection}
					<div class="asset-tile__collection">
						<div class="asset-tile__collection__badge" />
						<div class="asset-tile__collection__name">{formatWallet(asset.creator)}</div>
					</div>
				{/if}

				<div class="asset-tile__meta" on:click={goToAsset}>
					<div class="asset-tile__meta-item">
						<div class="asset-tile__meta-item__label">Unit</div>
						<div class="asset-tile__meta-item__value">
							{asset.unit}
						</div>
					</div>
					{#if amount !== null}
						<div class="asset-tile__meta-item">
							<div class="asset-tile__meta-item__label">Qty</div>
							<div class="asset-tile__meta-item__value">
								{amount} / {asset.total}
							</div>
						</div>
					{/if}

					{#if showListing && $escrowListingQuery.data}
						<div class="asset-tile__meta-item">
							<div class="asset-tile__meta-item__label">
								{#if $escrowListingQuery.data.escrow_listings.length > 0}
									Direct Sale
								{:else}
									Listing
								{/if}
							</div>
							<div class="asset-tile__meta-item__value">
								{#if $escrowListingQuery.data.escrow_listings.length > 0}
									{$escrowListingQuery.data.escrow_listings[0].sale_price}
									<img src="/icons/algo.svg" alt="Algo" />
								{:else}
									Unlisted
								{/if}
							</div>
						</div>
					{/if}
				</div>

				<div class="asset-tile__action">
					{#if (escrowListing || isOwner) && !walletIsConnected}
						<ConnectWallet label="Connect Wallet" />
					{:else if !!escrowListing && escrowListing.seller === $wallet.account}
						<RemoveEscrowListingTx
							assetId={id}
							bind:open={isOpen}
							on:remove={() => goto(`/assets/${id}`)}
						/>
					{:else if escrowListing && !isOwner}
						<BuyEscrowTx
							bind:open={isOpen}
							assetId={id}
							creator={escrowListing.creator}
							escrowId={escrowListing.id}
							unitPrice={escrowListing.sale_price}
							applicationId={escrowListing.application_id}
						/>
					{:else if !escrowListing && !!isOwner}
						<CreateEscrowListingTx
							assetId={id}
							creator={asset.creator}
							bind:open={isOpen}
							on:create={() => goto(`/assets/${id}`)}
						/>
					{/if}
				</div>
			</div>
		</div>
	</div>
{:else if $$slots.empty}
	<slot name="empty" />
{:else}
	<div class="asset-tile">
		<div class="asset-tile__inner">
			<div class="asset-tile__image">
				<SkeletonPlaceholder style="position: absolute; top: 0; width: 100%; height: 100%;" />
			</div>
			<div class="asset-tile__content">
				<div class="asset-tile__title-wrap">
					<div class="asset-tile__creator-avatar" style="border-radius: 50%; overflow: hidden;">
						<SkeletonPlaceholder style="width: 40px; height: 40px;" />
					</div>

					<div class="asset-tile__title">
						<SkeletonPlaceholder style="width: 120px; height: 2rem" />
					</div>
				</div>

				<div class="asset-tile__meta">
					<div class="asset-tile__meta-item">
						<div class="asset-tile__meta-item__label">Unit</div>
						<div class="asset-tile__meta-item__value">
							<SkeletonPlaceholder style="width: 60px; height: 1rem" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.asset-tile {
		position: relative;
		display: flex;
		border-radius: 5px;
		min-width: 0;
		overflow: hidden;

		background-color: var(--dp--black-02);

		&.unowned {
			opacity: 0.35;
		}

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
			padding-top: 100%;

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

			:global(.asset-tile__image__inner) {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		}

		&__content {
			flex: 1;

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
			top: -2rem;

			width: 2rem;
			height: 2rem;

			transform: translateY(-60%);
		}

		&__title-wrap {
			position: relative;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			padding-top: 1rem;

			@media screen and (min-width: 768px) {
				flex-direction: row;
				padding-top: 0;
			}
		}

		&__title {
			font-size: 1.375rem;
			font-weight: 500;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		&__links {
			display: flex;
			justify-content: flex-end;
			margin-top: 0.75rem;

			@media screen and (min-width: 768px) {
				min-width: 80px;
				margin-left: 1rem;
				margin-top: 0;
			}
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
			margin-top: 1.25rem;

			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 1rem 2rem;
		}

		&__meta-item {
			position: relative;

			display: flex;
			flex-direction: column;
			align-items: center;

			@media screen and (min-width: 768px) {
				align-items: flex-start;
			}

			&__label {
				font-size: 0.75rem;
				margin-bottom: 0.375rem;
				opacity: 0.5;
			}

			&__value {
				font-size: 1rem;
				font-weight: 500;

				display: flex;
				align-items: center;

				img {
					width: 0.875rem;
					height: auto;
					float: left;
					margin-left: 0.25rem;
				}
			}
		}

		&__action {
			position: absolute;
			left: 0;
			right: 0;
			padding: 0 1rem 1rem;
			margin-top: 1.25rem;
			background-color: var(--dp--black-03);

			:global(.bx--btn) {
				width: 100%;
				max-width: none;
			}
		}

		&:hover {
			cursor: pointer;

			.asset-tile__image {
				:global(img) {
					transform: scale(1.05);
				}
			}

			&.actionable {
				.asset-tile__content {
					transform: none;
				}
			}
		}

		&.open {
			.asset-tile__content {
				transform: none;
			}
		}
	}
</style>

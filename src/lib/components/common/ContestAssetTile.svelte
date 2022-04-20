<script lang="ts">
	import { onMount } from 'svelte'
	import {
		Button,
		ImageLoader,
		SkeletonPlaceholder,
		TooltipDefinition
	} from 'carbon-components-svelte'
	import { convertIPFSUrl, convertIPFSUrlOnly } from '$lib/constants/assets'
	import ProfileAvatar from '../profile/ProfileAvatar.svelte'
	import IconIPFS from '../../../../static/icons/ipfs.svg'
	import IconAlgoExplorer from '../../../../static/icons/algoexplorer.svg'
	import ContestVoteTx from '$lib/components/transactions/ContestVoteTx.svelte'
	import { getGetOrdinal, nWeightFormat } from '$lib/helper/stringUtils'
	import { wallet } from '$lib/stores/wallet'
	import ConnectWallet from './ConnectWallet.svelte'
	import ContestVoteCountdown from '../contest/ContestVoteCountdown.svelte'
	import { VotingStatus } from '$lib/constants/enums'

	export let id
	export let contestId
	export let votes: number = null
	export let rank: number = null
	export let weight: number = null
	export let votingStatus: VotingStatus
	export let votingStartTime = null
	export let isWeightedVoting = false

	let asset
	let isLoading = false
	let walletIsConnected = false

	wallet.subscribe((w) => {
		walletIsConnected = w.isConnected
	})

	onMount(() => {
		isLoading = true

		fetch(`/api/assets/${id}.json`)
			.then((response) => response.json())
			.then((a) => (asset = a))
			.finally(() => (isLoading = false))
	})

	const openIpfs = (ipfsCID: string) => {
		window.open(convertIPFSUrlOnly(ipfsCID), '_blank')
	}

	const openAlgoExplorer = () => {
		window.open(`https://algoexplorer.io/asset/${id}`, '_blank')
	}
</script>

<div class="asset-tile">
	{#if isLoading}
		<div class="asset-tile__inner">
			<div class="asset-tile__image">
				<SkeletonPlaceholder style="position: absolute; top: 0; width: 100%; height: 100%;" />
			</div>
		</div>
	{:else if !!asset}
		<div class="asset-tile__inner">
			<div class="asset-tile__image">
				<ImageLoader fadeIn src={convertIPFSUrl(asset.url)} />
			</div>
			<div class="asset-tile__content">
				<div class="asset-tile__title-wrap">
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
							on:click={() => openIpfs(asset.url)}
						/>
						<Button
							size="small"
							kind="secondary"
							icon={IconAlgoExplorer}
							iconDescription="View on Algo Explorer"
							on:click={() => openAlgoExplorer()}
						/>
					</div>
				</div>

				<div class="asset-tile__meta">
					<div class="asset-tile__meta-item">
						<div class="asset-tile__meta-item__label">Rank</div>
						<div class="asset-tile__meta-item__value">
							{#if rank === null}
								<SkeletonPlaceholder style="width: 3rem; height: 1rem" />
							{:else}
								{votes > 0 ? getGetOrdinal(rank) : 'N/A'}
							{/if}
						</div>
					</div>
					<div class="asset-tile__meta-item">
						<div class="asset-tile__meta-item__label">Votes</div>
						<div class="asset-tile__meta-item__value">
							{#if votes === null}
								<SkeletonPlaceholder style="width: 3rem; height: 1rem" />
							{:else}
								{votes}
							{/if}
						</div>
					</div>
					<div class="asset-tile__meta-item">
						<div class="asset-tile__meta-item__label">Weight</div>
						<div class="asset-tile__meta-item__value">
							{#if !isWeightedVoting}
								N/A
							{:else if weight === null}
								<SkeletonPlaceholder style="width: 3rem; height: 1rem" />
							{:else}
								<TooltipDefinition tooltipText={weight.toLocaleString()}>
									{nWeightFormat(weight, 3)}
								</TooltipDefinition>
								<img src="/images/dpanda-logo.png" alt="" />
							{/if}
						</div>
					</div>
				</div>

				{#if votingStatus === VotingStatus.ACTIVE}
					<div class="asset-tile__action">
						{#if walletIsConnected}
							<ContestVoteTx {contestId} assetId={id} />
						{:else}
							<ConnectWallet label="Connect Wallet to Vote" />
						{/if}
					</div>
				{:else if votingStatus === VotingStatus.PENDING && votingStartTime}
					<ContestVoteCountdown end={new Date(votingStartTime).getTime()} />
				{/if}
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.asset-tile {
		display: flex;
		align-items: center;
		border-radius: 5px;
		min-width: 0;

		background-color: var(--dp--black-02);

		&__inner {
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 100%;
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
				object-fit: contain;
				object-position: center;

				transition: transform 0.3s;
			}
		}

		&__content {
			width: 100%;
			min-height: 120px;
			top: -4rem;
			padding: 2.25rem 1.25rem 1.25rem;
			flex: 1;

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
			max-width: 100%;
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
			grid-template-columns: 1fr 1fr 1fr;
			gap: 2rem;
		}

		&__meta-item {
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
					width: 1.125rem;
					height: auto;
					float: left;
					margin-left: 0.25rem;
				}
			}
		}

		&__action {
			margin-top: 1.25rem;

			:global(.bx--btn) {
				width: 100%;
				max-width: none;
			}
		}

		&:hover {
			.asset-tile__image {
				:global(img) {
					transform: scale(1.05);
				}
			}
		}
	}
</style>

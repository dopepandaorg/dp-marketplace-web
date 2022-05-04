<script lang="ts">
	import { isValidAddress } from 'algosdk'
	import { Form, FormGroup, Button, TextInput, InlineLoading } from 'carbon-components-svelte'
	import Search from 'carbon-icons-svelte/lib/Search.svelte'
	import SubmitEntryTx from '../transactions/SubmitEntryTx.svelte'
	import ContestAssetTilePreview from '../common/ContestAssetTilePreview.svelte'
	import WalletNotConnected from '../common/WalletNotConnected.svelte'
	import { wallet } from '$lib/stores/wallet'
	import { operationStore, subscription } from '@urql/svelte'
	import { Q_SUB_MY_CONTEST_ENTRY } from '$lib/constants/queries'
	import type { AssetRecord } from '$lib/interfaces/asset'
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	export let contestId: string
	export let submittedEntryIds: string[]

	let assetId = null
	let rewardWallet = null
	let isRewardWalletValid = false
	let isAssetIdValid = false
	let isAssetIdPristine = false
	let isAssetAvailable = false

	let foundAsset: AssetRecord
	let isLoading = false
	let isValid = false
	let isSubmitting = false
	let hasEntrySubmitted = false

	let isConnected = false

	const validateAsset = () => {
		isLoading = true

		fetch(`/api/assets/${Number(assetId)}.json`)
			.then((response) => response.json())
			.then((a) => {
				isAssetIdPristine = true

				const isOwned = $wallet.assets.findIndex((wa) => wa.id === a.id) !== -1
				let isSubmitted = false
				
				if (!hasEntrySubmitted) {
					isSubmitted = submittedEntryIds.findIndex((se) => Number(se) !== a.id) !== -1
				}

				isAssetAvailable = isOwned && !a.isDeleted && a.isNFT && !isSubmitted

				if (isAssetAvailable) {
					foundAsset = a
				} else {
					foundAsset = null
				}
			})
			.finally(() => (isLoading = false))
	}

	const onSubmit = () => {
		dispatch('submit')
	}

	const contestEntry = operationStore(Q_SUB_MY_CONTEST_ENTRY, {
		contest_id: contestId,
		wallet: $wallet.account
	})

	subscription(contestEntry).subscribe((ce) => {
		if (ce.data && ce.data.contest_entries) {
			hasEntrySubmitted = ce.data.contest_entries.length > 0

			if (ce.data.contest_entries.length > 0) {
				const contestEntry = ce.data.contest_entries[0]
				assetId = contestEntry.asset_id
				isAssetIdPristine = true

				validateAsset()
			}
		}
	})

	wallet.subscribe((w) => {
		rewardWallet = w.account
		isConnected = w.account && w.isConnected
	})

	$: {
		if (assetId) {
			const assetMatch = assetId.match(/^[0-9]{8,10}$/)
			isAssetIdValid = assetMatch && assetMatch.length > 0
		}

		if (rewardWallet) {
			isRewardWalletValid = isValidAddress(rewardWallet)
		}

		// Combine all individual validations
		isValid = isAssetIdValid && rewardWallet && isAssetIdPristine && isAssetAvailable
	}
</script>

<Form on:submit={(e) => e.preventDefault()}>
	<div class="form-header">
		<h2>Submit your entry</h2>
		<p>
			To submit an entry, you will first need to mint your submission as an NFT. Head over the our <a
				href="/create"
				target="_blank">Minter</a
			>
			and upload your submission as an image file.
			<br /><br />
			Once you have your ASA ID, enter it in the field below to see a preview of your submission. If
			you are satisfied with your submission, select 'Submit Entry' and sign the transaction!
			<br /><br />
			Please Note: The ASA ID should be an NFT asset that you own.
		</p>
	</div>

	{#if isConnected}
		<FormGroup>
			<div class="inline">
				<TextInput
					size="xl"
					required
					labelText="Asset ID*"
					placeholder="Enter the ASA ID of your entry"
					disabled={hasEntrySubmitted}
					bind:value={assetId}
					on:change={() => (isAssetIdPristine = false)}
					invalid={isAssetIdPristine && !isAssetAvailable && !isLoading}
					invalidText="Asset not available, please ensure its an ASA of an NFT that you own."
				/>

				<Button
					icon={isLoading ? InlineLoading : Search}
					disabled={!isAssetIdValid || isLoading || hasEntrySubmitted}
					on:click={() => validateAsset()}
				>
					Find Asset
				</Button>
			</div>
		</FormGroup>

		<FormGroup>
			<TextInput
				size="xl"
				required
				labelText="Reward Wallet*"
				placeholder="Enter the wallet to receive your reward"
				disabled={hasEntrySubmitted}
				bind:value={rewardWallet}
				invalid={!isRewardWalletValid && !isLoading}
				invalidText="Invalid address, please ensure its a valid Algorand wallet address."
			/>
		</FormGroup>

		<hr />

		{#if foundAsset}
			<FormGroup>
				<div class="asset-preview">
					<h4 for="">Asset Preview</h4>

					<div class="asset-preview__asset">
						<ContestAssetTilePreview asset={foundAsset} />
					</div>
				</div>
			</FormGroup>

			<hr />
		{/if}

		<div class="form-submit">
			<SubmitEntryTx
				{contestId}
				{assetId}
				{rewardWallet}
				{isValid}
				bind:isSubmitting
				on:submitTx={onSubmit}
			/>
		</div>
	{:else}
		<WalletNotConnected />
	{/if}
</Form>

<style lang="scss">
	.form-header {
		margin-top: 4rem;
		margin-bottom: 4rem;

		h2 {
			margin-bottom: 1rem;
		}
	}

	.form-submit {
		display: grid;
		justify-content: space-between;
		grid-template-columns: 1fr;
		gap: 1rem;

		:global(.bx--btn) {
			width: 100%;
			min-height: 3.5rem;
			max-width: none;
		}
	}

	.asset-preview {
		margin-bottom: 1rem;
		h4 {
			margin-bottom: 0.5rem;
		}

		&__asset {
			margin-top: 1.5rem;
			max-width: 400px;
		}
	}

	.inline {
		display: flex;
		flex-direction: column;

		@media screen and (min-width: 768px) {
			flex-direction: row;
		}

		:global(.bx--btn) {
			align-self: flex-start;
			max-height: 2.5rem;
			margin-left: 0;
			margin-top: -1rem;
			margin-bottom: 2rem;
			width: 100%;
			max-width: none;

			@media screen and (min-width: 768px) {
				margin-top: 2rem;
				margin-left: 2rem;
				width: auto;
			}
		}
	}
</style>

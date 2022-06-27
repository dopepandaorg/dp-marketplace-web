<script lang="ts">
	import {
		Form,
		FormGroup,
		Button,
		TextInput,
		InlineLoading,
		Modal
	} from 'carbon-components-svelte'
	import Search from 'carbon-icons-svelte/lib/Search.svelte'
	import { createEventDispatcher } from 'svelte'

	import { wallet } from '$lib/stores/wallet'
	import type { AssetRecord } from '$lib/interfaces/asset'
	import AssetTile from '../common/AssetTile.svelte'

	const dispatch = createEventDispatcher()

	export let open
	export let index

	let assetId = null
	let isAssetIdValid = false
	let isAssetIdPristine = false
	let isAssetAvailable = false

	let foundAsset: AssetRecord
	let isLoading = false
	let isValid = false
	let isSubmitting = false

	const validateAsset = () => {
		isLoading = true

		fetch(`/api/assets/${Number(assetId)}.json`)
			.then((response) => response.json())
			.then((a) => {
				isAssetIdPristine = true

				const isOwned = $wallet.assets.findIndex((wa) => wa.id === a.id) !== -1
				isAssetAvailable = isOwned && !a.isDeleted && a.isNFT

				if (isAssetAvailable) {
					foundAsset = a
				} else {
					foundAsset = null
				}
			})
			.finally(() => (isLoading = false))
	}

	const submit = () => {
		isSubmitting = true

		if (foundAsset) {
			dispatch('select', {
				id: foundAsset.id
			})
		}
	}

	$: {
		if (assetId) {
			const assetMatch = assetId.match(/^[0-9]{8,10}$/)
			isAssetIdValid = assetMatch && assetMatch.length > 0
		}

		// Combine all individual validations
		isValid = isAssetIdValid && isAssetIdPristine && isAssetAvailable
	}
</script>

<Modal
	bind:open
	preventCloseOnClickOutside
	modalLabel={index >= 0 ? `Slot ${index + 1}/8` : null}
	modalHeading="Update Profile Showcase"
	primaryButtonText="Select"
	secondaryButtonText="Cancel"
	primaryButtonDisabled={!foundAsset}
	on:click:button--secondary={() => (open = false)}
	on:open
	on:submit={submit}
>
	<Form on:submit={(e) => e.preventDefault()}>
		<div class="form-inner">
			<FormGroup>
				<h5 for="">Asset Lookup</h5>
				<p>Enter the ASA ID of your asset below to locate and preview before submission.</p>

				<div class="inline">
					<TextInput
						size="xl"
						required
						placeholder="Enter the ASA ID"
						bind:value={assetId}
						on:change={() => (isAssetIdPristine = false)}
						invalid={isAssetIdPristine && !isAssetAvailable && !isLoading}
						invalidText="Asset not available, please ensure its an ASA of an NFT that you own."
					/>

					<Button
						icon={isLoading ? InlineLoading : Search}
						iconDescription="Find Asset"
						tooltipAlignment="end"
						kind="secondary"
						disabled={!isAssetIdValid || isLoading}
						on:click={() => validateAsset()}
					/>
				</div>
			</FormGroup>

			<div class="asset-preview">
				<div class="asset-preview__asset">
					{#if !isLoading && foundAsset}
						<AssetTile id={foundAsset.id} />
					{/if}
				</div>
			</div>
		</div>
	</Form>
</Modal>

<style lang="scss">
	.form-inner {
		display: grid;
		grid-template-columns: 1fr;
		margin-top: 2rem;

		@media screen and (min-width: 768px) {
			grid-template-columns: 1fr 1fr;
			gap: 2rem;
		}
	}

	h5 {
		margin-bottom: 0.5rem;
	}

	p {
		font-size: 0.875rem;
		line-height: 1.5;
		opacity: 0.75;
		margin-bottom: 1.5rem;
		padding-right: 0;
	}

	.asset-preview {
		display: flex;
		justify-content: center;

		&__asset {
			width: 100%;

			@media screen and (min-width: 768px) {
				flex: 1;
				max-width: 280px;
			}
		}
	}

	.inline {
		display: flex;
		flex-direction: row;
		overflow: hidden;

		:global(.bx--btn) {
			align-self: flex-start;
			max-height: 2.5rem;
			margin-left: 1rem;
		}
	}

	:global(.bx--modal-footer .bx--btn) {
		border-radius: 0;
	}
</style>

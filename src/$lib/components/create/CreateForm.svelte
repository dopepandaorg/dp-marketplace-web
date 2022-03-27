<script lang="ts">
	import {
		Form,
		FormGroup,
		Button,
		TextInput,
		TextArea,
		Toggle,
		InlineLoading
	} from 'carbon-components-svelte'

	import AssetUnitInput from './AssetUnitInput.svelte'
	import MediaInput from './MediaInput.svelte'
	import { wallet } from '../../../stores/wallet'
	import { buildTransactionCreateASA } from '../../../$lib/transaction-builder/createAsset'
	import type { AssetMetadata } from 'src/$lib/interfaces/asset'

	let name = ''
	let unit = ''
	let isUnitValid = false
	let description = ''
	let ipfsCID = ''
	let isIpfsCIDValid = false
	let isSensitive = false

	let isValid = true
	let isSubmitting = false

	const clearForm = () => {
		name = ''
		unit = ''
		isUnitValid = false
		description = ''
		ipfsCID = ''
		isIpfsCIDValid = false
		isSensitive = false

		isValid = false
	}

	let submit = (e: Event) => {
		e.preventDefault()

		if (isValid) {
			isSubmitting = true

			// Build Asset Metadata
			const metadata: AssetMetadata = {
				assetName: name,
				unitName: unit,
				assetURL: `ipfs://${ipfsCID}`
			}

			buildTransactionCreateASA($wallet.type, $wallet.account, metadata, 0)
				.then(() => clearForm())
				.finally(() => (isSubmitting = false))
		}
	}

	$: {
		// Validate form with default conditions
		const isNameValid = !!name

		// Combine all individual validations
		isValid = isNameValid && isUnitValid && isIpfsCIDValid
	}
</script>

<Form on:submit={submit}>
	<FormGroup>
		<TextInput
			size="xl"
			required
			labelText="Asset Name*"
			placeholder="Enter a name for your Asset"
			bind:value={name}
		/>

		<AssetUnitInput bind:value={unit} bind:isValid={isUnitValid} />

		<TextArea
			labelText="Description"
			placeholder="Enter a short description for your Asset"
			bind:value={description}
		/>
	</FormGroup>

	<hr />

	<FormGroup>
		<MediaInput bind:value={ipfsCID} bind:isValid={isIpfsCIDValid} />
	</FormGroup>

	<hr />

	<FormGroup>
		<Toggle
			labelText="Does your asset contain sensitive content?"
			labelA="No"
			labelB="Yes"
			bind:value={isSensitive}
		/>
	</FormGroup>

	<hr />

	<div class="form-submit">
		<div>
			<Button kind="secondary" on:click={clearForm} disabled={isSubmitting}>Clear</Button>
		</div>

		<div>
			{#if isSubmitting}
				<InlineLoading status="active" description="Submitting ..." />
			{:else}
				<Button type="submit" disabled={!isValid}>Create</Button>
			{/if}
		</div>
	</div>
</Form>

<style lang="scss">
	.form-submit {
		display: flex;
		justify-content: space-between;

		> div:first-child {
			flex: 1;
			margin-right: 2rem;
		}

		> div:last-child {
			flex: 1;
			margin-left: 2rem;

			display: flex;
			align-items: center;
			justify-content: center;
		}

		:global(button) {
			width: 100%;
			min-height: 3.5rem;
		}
	}
</style>

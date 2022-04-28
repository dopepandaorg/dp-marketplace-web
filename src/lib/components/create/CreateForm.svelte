<script lang="ts">
	import { Form, FormGroup, Button, TextInput, TextArea, Toggle } from 'carbon-components-svelte'
	import Erase from 'carbon-icons-svelte/lib/Erase.svelte'

	import AssetUnitInput from './AssetUnitInput.svelte'
	import AssetAttributesInput from './AssetAttributesInput.svelte'
	import MediaInput from '../common/MediaInput.svelte'
	import CreateAssetTx from '../transactions/CreateAssetTx.svelte'
	import { AssetMetadataStandard } from '$lib/constants/enums'

	let name = ''
	let unit = ''
	let isUnitValid = false
	let description = ''
	let ipfsCID = ''
	let ipfsMimeType = null
	let isIpfsCIDValid = false
	let isSensitive = false
	let metadataStandard = AssetMetadataStandard.ARC69
	let metadataAttributes = [{ key: '', value: '' }]

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
		metadataStandard = AssetMetadataStandard.ARC69
		metadataAttributes = [{ key: '', value: '' }]

		isValid = false
	}

	$: {
		// Validate form with default conditions
		const isNameValid = !!name

		// Combine all individual validations
		isValid = isNameValid && isUnitValid && isIpfsCIDValid
	}
</script>

<Form on:submit={(e) => e.preventDefault()}>
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
		<MediaInput bind:value={ipfsCID} bind:isValid={isIpfsCIDValid} bind:mime={ipfsMimeType} />
	</FormGroup>

	<hr />

	<FormGroup>
		<AssetAttributesInput bind:standard={metadataStandard} bind:attributes={metadataAttributes} />
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
		<Button kind="secondary" on:click={clearForm} disabled={isSubmitting} icon={Erase}>Clear</Button
		>
		<CreateAssetTx
			{name}
			{unit}
			{description}
			{ipfsCID}
			{ipfsMimeType}
			{metadataStandard}
			{metadataAttributes}
			{isSensitive}
			{isValid}
			onClear={clearForm}
			bind:isSubmitting
		/>
	</div>
</Form>

<style lang="scss">
	.form-submit {
		display: grid;
		justify-content: space-between;
		grid-template-columns: 1fr;
		gap: 1rem;

		@media screen and (min-width: 768px) {
			grid-template-columns: 1fr 1fr;
			gap: 4rem;
		}

		:global(.bx--btn) {
			width: 100%;
			min-height: 3.5rem;
			max-width: none;
		}
	}
</style>

<script lang="ts">
	import { Form, FormGroup, Button, TextInput, TextArea, Toggle } from 'carbon-components-svelte'

	import AssetUnitInput from './AssetUnitInput.svelte'
	import MediaInput from '../common/MediaInput.svelte'
	import CreateAssetTx from '../transactions/CreateAssetTx.svelte'

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
		<Button kind="secondary" on:click={clearForm} disabled={isSubmitting}>Clear</Button>
		<CreateAssetTx
			{name}
			{unit}
			{ipfsCID}
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
		grid-template-columns: 1fr 1fr;
		gap: 4rem;

		:global(.bx--btn) {
			width: 100%;
			min-height: 3.5rem;
		}
	}
</style>

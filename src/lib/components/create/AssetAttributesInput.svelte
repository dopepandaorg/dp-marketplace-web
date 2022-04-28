<script lang="ts">
	import { AssetMetadataStandard } from '$lib/constants/enums'

	import { Button, RadioButton, RadioButtonGroup, TextInput } from 'carbon-components-svelte'
	import Add from 'carbon-icons-svelte/lib/Add.svelte'
	import RowDelete from 'carbon-icons-svelte/lib/RowDelete.svelte'

	const emptyAttribute = { key: '', value: '' }

	export let standard: AssetMetadataStandard = AssetMetadataStandard.ARC69
	export let attributes = [{ ...emptyAttribute }]

	let isLastAttributeValid = true

	const addAttribute = () => {
		attributes = [...attributes, { ...emptyAttribute }]
	}

	const removeAttribute = (i: number) => {
		attributes = attributes.filter((a, ai) => ai !== i)
	}

	$: {
		if (attributes.length > 0) {
			const lastAttribute = attributes[attributes.length - 1]

			isLastAttributeValid = !!lastAttribute.key && !!lastAttribute.value
		}
	}
</script>

<div class="attributes-input bx--form-item">
	<label for="">Metadata Standard</label>
	<RadioButtonGroup label="Metadata Standard" bind:selected={standard}>
		<RadioButton labelText="ARC-3" value="arc3" disabled />
		<RadioButton labelText="ARC-69" value="arc69" />
	</RadioButtonGroup>

	<label for="">Attributes</label>
	<div class="attributes-input-wrapper">
		{#each attributes as a, i}
			<div class="attributes-input">
				<TextInput
					labelText="Attribute Key"
					placeholder="Enter trait (e.g 'Background')"
					bind:value={a.key}
				/>
				<TextInput
					labelText="Attribute Value"
					placeholder="Enter value (e.g 'Green')"
					bind:value={a.value}
				/>
				<Button
					size="field"
					kind="danger-tertiary"
					icon={RowDelete}
					iconDescription="Delete Attribute"
					on:click={() => removeAttribute(i)}
					disabled={attributes.length <= 1}
				/>
			</div>
		{/each}

		<div class="attributes-input-add">
			<Button
				size="field"
				kind="secondary"
				on:click={addAttribute}
				icon={Add}
				disabled={!isLastAttributeValid}>Add Attribute</Button
			>
		</div>
	</div>
</div>

<style lang="scss">
	.attributes-input-wrapper {
		width: 100%;

		.attributes-input-add {
			margin-top: 1.5rem;
		}

		.attributes-input {
			display: grid;
			grid-template-columns: 1fr 1fr 3rem;
			gap: 1rem;
			margin-bottom: 1rem;
			overflow: hidden;

			@media screen and (min-width: 768px) {
				gap: 2rem;
			}

			:global(.bx--form-item) {
				margin-bottom: 0;
			}

			:global(.bx--form-item > label) {
				font-size: 0.75rem;
				font-weight: normal;
				margin-bottom: 0.5rem;
				color: #c6c6c6;
			}

			:global(.bx--btn) {
				justify-content: center;
				align-self: flex-end;
			}
		}
	}
</style>

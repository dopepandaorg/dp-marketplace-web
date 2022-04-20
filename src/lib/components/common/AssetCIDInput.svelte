<script lang="ts">
	import { TextInput } from 'carbon-components-svelte'
	import { E_CID_INPUT_INCORRECT } from '$lib/constants/strings'
	export let value: string
	export let isValid = true

	let invalidText

	const validate = () => {
		if (value.length >= 7 && !value.startsWith('ipfs://')) {
			isValid = false
			invalidText = E_CID_INPUT_INCORRECT
		} else {
			isValid = true
			invalidText = null
		}
	}
</script>

<TextInput
	size="xl"
	required
	labelText="IPFS CID"
	placeholder="ipfs:// ..."
	invalid={!isValid}
	{invalidText}
	on:input={validate}
	bind:value
/>

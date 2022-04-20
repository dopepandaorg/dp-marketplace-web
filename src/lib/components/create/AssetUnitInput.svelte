<script>
	import { TextInput } from 'carbon-components-svelte'
	import { E_UNIT_INPUT_CHAR_LEN, E_UNIT_INPUT_CHAR_TYPE } from '$lib/constants/strings'
	export let value
	export let isValid = false

	let invalidText

	const validate = () => {
		if (value.length > 0 && value.length > 8) {
			isValid = false
			invalidText = E_UNIT_INPUT_CHAR_LEN
		} else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
			isValid = false
			invalidText = E_UNIT_INPUT_CHAR_TYPE
		} else {
			isValid = true
			invalidText = null
		}
	}
</script>

<TextInput
	size="xl"
	required
	labelText="Unit Name*"
	placeholder="Enter a unique code for your Asset"
	invalid={value.length > 0 && !isValid}
	{invalidText}
	on:input={validate}
	bind:value
/>

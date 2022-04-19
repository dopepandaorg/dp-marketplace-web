<script>
	import { TextInput } from 'carbon-components-svelte'
	import { E_HANDLE_INPUT_INVALID } from '$lib/constants/strings'
	export let value
	export let isValid = false

	export let label
	export let placeholder
	let invalidText

	const validate = () => {
		if (value.length > 0 && !value.match(/^[a-zA-Z0-9_.-]+$/)) {
			isValid = false
			invalidText = E_HANDLE_INPUT_INVALID
		} else {
			isValid = true
			invalidText = null
		}
	}

	validate()
</script>

<TextInput
	size="xl"
	required
	labelText={label}
	{placeholder}
	invalid={value.length > 0 && !isValid}
	{invalidText}
	on:input={validate}
	bind:value
	disabled={true}
	helperText="Subscribe to a DopePanda membership and reserve your url handle"
/>

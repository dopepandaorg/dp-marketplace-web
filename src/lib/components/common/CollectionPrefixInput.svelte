<script>
	import {
		Button,
		ContentSwitcher,
		Switch,
		TextInput,
		InlineLoading
	} from 'carbon-components-svelte'
	import Search from 'carbon-icons-svelte/lib/Search.svelte'

	export let value = ''

	let selectedIndex = 0
	let input = value
	let isLoading = false
	let isValid = false

	const validatePrefix = () => {
		isLoading = true

		setTimeout(() => {
			isLoading = false
			isValid = true
			value = input
		}, 1000)
	}

	$: {
		if (selectedIndex === 0) {
			value = '*'
		} else if (selectedIndex === 1) {
			value = input
		}
	}
</script>

<div class="collection-prefix-input">
	<div class="collection-prefix-input__switcher">
		<ContentSwitcher bind:selectedIndex>
			<Switch text="Include all" />
			<Switch text="Filter by Prefix" />
		</ContentSwitcher>
	</div>

	{#if selectedIndex === 1}
		<div class="collection-prefix-input__field">
			<TextInput
				bind:value={input}
				labelText="Prefix"
				placeholder="Enter a prefix to filter assets (ie. DPNFT-)"
			/>
			<Button
				size="field"
				icon={isLoading ? InlineLoading : Search}
				iconDescription="Search Assets"
				tooltipAlignment="end"
				kind="secondary"
				disabled={!input || isLoading}
				on:click={() => validatePrefix()}
			/>
		</div>
	{/if}
</div>

<style lang="scss">
	.collection-prefix-input {
		&__field {
			display: flex;
			align-items: flex-end;

			:global(.bx--btn) {
				align-self: flex-end;
				margin-left: 1rem;
			}

			:global(.bx--form-item) {
				margin-bottom: 0;
			}
		}
	}
</style>

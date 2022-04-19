<script>
	import { LocalStorage, Toggle } from 'carbon-components-svelte'

	let toggled = false
</script>

<LocalStorage key="dp_algo-network-testnet" bind:value={toggled} />
<Toggle size="sm" labelText="Testnet?" bind:toggled />

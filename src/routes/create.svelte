<script>
	import { wallet } from '$lib/stores/wallet'
	import CreateForm from '$lib/components/create/CreateForm.svelte'
	import PageHeader from '$lib/components/common/PageHeader.svelte'
	import WalletNotConnected from '$lib/components/common/WalletNotConnected.svelte'

	let isConnected
	wallet.subscribe((w) => (isConnected = w.isConnected))
</script>

<svelte:head>
	<title>Create with Minter | DopePanda</title>
</svelte:head>

<PageHeader
	title="Minter"
	subtitle="Create and mint your digital art on Algorand"
	size="sm"
	theme={1}
/>

<div class="section section-create">
	<div class="container container-sm">
		{#if isConnected}
			<CreateForm />
		{:else}
			<WalletNotConnected />
		{/if}
	</div>
</div>

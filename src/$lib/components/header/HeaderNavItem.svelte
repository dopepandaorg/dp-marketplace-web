<script lang="ts">
	import { Button } from 'carbon-components-svelte'

	export let icon: any
	export let label: string
	export let action: () => void
</script>

<div class="header-nav-item">
	<Button kind="ghost" {icon} on:click={() => action()}>{label}</Button>
</div>

<style lang="scss">
	.header-nav-item {
		margin: 0.25rem 0;

		:global(button) {
			font-size: 0.875rem;
			color: #fff;

			width: 100%;
			flex-direction: row-reverse;
			justify-content: flex-end;

			padding-top: 0.625rem;
			padding-bottom: 0.625rem;
			min-height: 2.5rem;
		}

		:global(button svg) {
			margin-right: 1rem;
			margin-left: 0;
		}
	}
</style>

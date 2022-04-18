<script lang="ts">
	import { InlineLoading } from 'carbon-components-svelte'
	import { LoadingStatus } from '$lib/constants/enums'

	export let stepCount
	export let status: LoadingStatus = LoadingStatus.NONE
	export let label
	export let descriptionPending
	export let descriptionSuccess
</script>

<div class="tx-step status--{status}">
	<div class="tx-step__label">
		{stepCount}. {label}
	</div>
	<div class="tx-step__progress">
		{#if status === LoadingStatus.IN_PROGRESS}
			<InlineLoading status="active" description={descriptionPending} />
		{:else if status === LoadingStatus.SUCCESS}
			<InlineLoading status="finished" description={descriptionSuccess} />
		{:else if status === LoadingStatus.NONE}
			<InlineLoading status="inactive" description="Waiting to process ..." />
		{/if}
	</div>
</div>

<style lang="scss">
	.tx-step {
		margin-bottom: 0.75rem;

		&.status--NONE {
			opacity: 0.25;
		}

		&__progress {
			padding: 0.25rem 1rem;
		}
	}
</style>

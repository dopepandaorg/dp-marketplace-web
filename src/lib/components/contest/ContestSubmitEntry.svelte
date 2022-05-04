<script>
	import { Button } from 'carbon-components-svelte'
	import ArrowRightIcon from 'carbon-icons-svelte/lib/ArrowRight.svelte'

	export let onSubmit
	export let pendingSubmissionMessage
	import Touch_1 from 'carbon-icons-svelte/lib/Touch_1.svelte'
</script>

<div class="submit-entry-notice">
	<div class="submit-entry-notice__icon">
		<Touch_1 />
	</div>

	<h4>This contest is open for entries!</h4>

	{#if pendingSubmissionMessage}
		<div class="description">
			{@html pendingSubmissionMessage}
		</div>
	{/if}

	<div class="submit-entry-notice__action">
		<Button kind="tertiary" on:click={() => onSubmit()} icon={ArrowRightIcon}
			>Submit your Entry</Button
		>
	</div>
</div>

<style lang="scss">
	.submit-entry-notice {
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: 300px;
		padding: 2rem;
		text-align: center;

		background-color: var(--dp--black-03);
		background: linear-gradient(
				109.08deg,
				rgba(253, 157, 93, 0.25) 0%,
				rgba(253, 44, 160, 0.25) 49.53%,
				rgba(51, 151, 255, 0.25) 104.51%
			),
			#555555;
		border-radius: 5px;

		@media screen and (min-width: 768px) {
			padding: 2rem;
			min-height: 300px;
			text-align: left;
		}

		h4 {
			font-weight: 500;
			margin-bottom: 0.5rem;
		}

		.description {
			font-size: 1rem;
			line-height: 1.3;
			margin-top: 0.75rem;
			opacity: 0.85;
		}

		&__icon {
			margin-bottom: 2rem;

			:global(svg) {
				width: 4rem;
				height: 4rem;
			}
		}

		&__action {
			margin-top: 2rem;
		}
	}
</style>

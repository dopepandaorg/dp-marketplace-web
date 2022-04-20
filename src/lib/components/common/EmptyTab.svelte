<script lang="ts">
	export let icon = null
	export let title
	export let description = null
</script>

<div class="empty-tab">
	{#if icon}
		<div class="empty-tab__icon">
			<img src={icon} alt={title} />
		</div>
	{/if}

	<h4>{title}</h4>

	{#if description}
		<div class="description">
			{@html description}
		</div>
	{/if}
</div>

<style lang="scss">
	.empty-tab {
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: 300px;
		padding: 2rem;
		text-align: center;

		background-color: var(--dp--black-03);
		border-radius: 5px;

		@media screen and (min-width: 768px) {
			padding: 4rem;
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
			opacity: 0.65;
		}

		&__icon {
			margin-bottom: 2rem;

			img {
				width: 8rem;
				height: 8rem;
			}
		}
	}
</style>

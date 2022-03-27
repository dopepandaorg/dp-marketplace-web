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
		<p>{description}</p>
	{/if}
</div>

<style lang="scss">
	.empty-tab {
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: 300px;
		padding: 4rem;

		background-color: var(--dp--black-03);
		border-radius: 5px;

		h4 {
			margin-bottom: 0.5rem;
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

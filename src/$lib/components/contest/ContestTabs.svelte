<script lang="ts">
	export let tabIndex = 0

	const navigationItems = [
		{
			id: 'entries',
			label: 'Entries'
		},
		{
			id: 'prizes',
			label: 'Prizes'
		},
		{
			id: 'rules',
			label: 'Rules'
		}
	]
</script>

<div class="contest-detail-tabs">
	{#each navigationItems as item, i}
		<div
			on:click={() => (tabIndex = i)}
			class="contest-detail-tabs-item {i === tabIndex ? 'active' : ''}"
		>
			{item.label}
		</div>
	{/each}
</div>

<style lang="scss">
	.contest-detail-tabs {
		display: flex;
		margin-bottom: 2rem;

		> div {
			flex: 1;
			margin-right: 4px;

			&:last-child {
				margin-right: 0;
			}
		}
	}

	.contest-detail-tabs-item {
		font-size: 1rem;
		font-weight: 500;
		line-height: 1.3;

		position: relative;
		display: block;
		padding: 1rem;
		transition: background-color 70ms;

		&:hover {
			cursor: pointer;
		}

		&:after {
			content: '';
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			width: 100%;
			height: 2px;
			background-color: var(--dp--black-03);
		}

		&.active {
			background-color: var(--dp--black-03);

			&:after {
				opacity: 1;
				visibility: visible;
				background: linear-gradient(109.08deg, #fd9d5d 0%, #fd2ca0 49.53%, #3397ff 104.51%);
			}
		}

		&:hover {
			background-color: var(--dp--black-03);
		}
	}
</style>

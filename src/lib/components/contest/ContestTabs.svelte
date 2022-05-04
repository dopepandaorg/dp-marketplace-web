<script lang="ts">
	export let tabIndex = 0
	export let isSubmittable = false

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

	if (isSubmittable) {
		navigationItems.push({
			id: 'submit',
			label: 'Submit Entry'
		})
	}
</script>

<div class="contest-detail-tabs">
	{#each navigationItems as item, i}
		<div
			on:click={() => (tabIndex = i)}
			class="contest-detail-tabs-item {i === tabIndex && 'active'} {item.id === 'submit' &&
				'highlight'}"
		>
			<span>{item.label}</span>
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

		span {
			position: relative;
			z-index: 10;
		}

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

		&.highlight {
			background: linear-gradient(109.08deg, #fd9d5d 0%, #fd2ca0 49.53%, #3397ff 104.51%);
			border-radius: 4px;

			&:before {
				content: '';
				position: absolute;
				top: 2px;
				right: 2px;
				left: 2px;
				bottom: 2px;
				background-color: var(--dp--black-01);
				transition: background-color 70ms, opacity 70ms;
			}

			&:after {
				opacity: 1;
				visibility: visible;
				background: linear-gradient(109.08deg, #fd9d5d 0%, #fd2ca0 49.53%, #3397ff 104.51%);
			}
		}

		&.active {
			background-color: var(--dp--black-03);

			&:after {
				opacity: 1;
				visibility: visible;
				background: linear-gradient(109.08deg, #fd9d5d 0%, #fd2ca0 49.53%, #3397ff 104.51%);
			}

			&.highlight {
				&:before {
					opacity: 0;
				}
			}
		}

		&:hover {
			background-color: var(--dp--black-03);

			&:before {
				background-color: var(--dp--black-03);
			}
		}
	}
</style>

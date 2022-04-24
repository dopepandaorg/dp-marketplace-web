<script lang="ts">
	import type { DPANDAMembershipTier } from '$lib/constants/enums'
	import { getMembershipTierMinAmount, tiersFeatures } from '$lib/helper/membershipTiers'
	import { TooltipIcon } from 'carbon-components-svelte'
	import { Information } from 'carbon-icons-svelte'

	export let tier: DPANDAMembershipTier
	export let title: string
</script>

<div class="membership-features-column tier--{tier}">
	<div class="membership-features-column__title-wrap">
		<div class="membership-features-column__title">{title}</div>
		<div class="membership-features-column__caption">{getMembershipTierMinAmount(tier)}</div>
	</div>

	<div class="features-list">
		{#each tiersFeatures[tier] as feature}
			{#if feature.type === 'label'}
				<div class="features-list__label">{feature.text}</div>
			{:else if feature.type === 'item'}
				<div class="features-item {feature.isDisabled && 'empty'}">
					<div class="features-item__icon"><svelte:component this={feature.icon} /></div>
					<div class="features-item__label">
						{feature.text}

						{#if feature.tooltip}
							<TooltipIcon tooltipText={feature.tooltip} align="end" icon={Information} />
						{/if}
					</div>
				</div>
			{/if}
		{/each}
	</div>
</div>

<style lang="scss">
	.membership-features-column {
		&__title-wrap {
			padding: 1.25rem;
			border-radius: 4px 4px 0 0;
		}

		&__title {
			font-size: 1.125rem;
			font-weight: bold;

			letter-spacing: 0.0375rem;
		}

		&__caption {
			margin-top: 0.5rem;
		}

		.features-list {
			background-color: #000;
			padding: 0.75rem 0;
		}

		.features-list__label {
			padding: 1rem 1.5rem 0.5rem;
			opacity: 0.5;
			margin-top: 1rem;

			&:first-child {
				margin-top: 0;
			}
		}

		.features-item {
			display: flex;
			align-items: center;
			padding: 0.75rem 1.5rem;

			&.empty {
				opacity: 0.25;
			}

			&__icon {
				margin-right: 1rem;

				:global(svg) {
					width: 1.5rem;
					height: 1.5rem;
				}
			}

			&__label {
				display: flex;
				align-items: center;
				font-size: 1.125rem;

				:global(.bx--tooltip__trigger) {
					margin-left: 0.625rem;
					margin-top: 0.25rem;
				}

				:global(svg) {
					width: 1.25rem;
					height: 1.25rem;
				}
			}
		}

		&.tier--1 {
			.membership-features-column__title-wrap {
				background: radial-gradient(100% 448.78% at 0% 100%, #a01a68 0%, #262626 100%);
			}
		}

		&.tier--2 {
			.membership-features-column__title-wrap {
				background: radial-gradient(100% 448.78% at 0% 100%, #95ab6d 0%, #ccb050 100%);
			}
		}

		&.tier--3 {
			.membership-features-column__title-wrap {
				background: radial-gradient(100% 448.78% at 0% 100%, #092003 0%, #1f5208 100%);
			}
		}
	}
</style>

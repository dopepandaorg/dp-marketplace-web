<script lang="ts">
	import { goto } from '$app/navigation'
	import { headerMenuExit } from '$lib/stores/header'
	import { Button } from 'carbon-components-svelte'
	import { wallet } from '$lib/stores/wallet'
	import { getMembershipTierTitle } from '$lib/helper/membershipTiers'
	import { DPANDAMembershipTier } from '$lib/constants/enums'

	let dpandaTier = DPANDAMembershipTier.T_EMPTY
	wallet.subscribe((w) => {
		dpandaTier = w.dpandaTier
	})

	const goToMembership = () => {
		goto('/membership')
		headerMenuExit()
	}
</script>

{#if dpandaTier && dpandaTier > DPANDAMembershipTier.T_BASE}
	<div class="header-subscription tier--{$wallet.dpandaTier}">
		<div>
			<div class="header-subscription__title">Membership Tier #{$wallet.dpandaTier}</div>
			<div class="header-subscription__value">
				{getMembershipTierTitle($wallet.dpandaTier)}
			</div>
		</div>

		<div class="header-subscription__action">
			<Button size="small" kind="tertiary" on:click={goToMembership}>View</Button>
		</div>
	</div>
{/if}

<style lang="scss">
	.header-subscription {
		display: flex;
		align-items: center;
		justify-content: space-between;

		padding: 1rem;
		color: #fff;
		background: radial-gradient(
			100% 448.78% at 0% 163.41%,
			#fd9d5d 12.03%,
			#fd2ca0 20.48%,
			rgba(38, 38, 38, 0) 101.28%
		);

		border-radius: 5px;

		&.tier--1 {
			background: radial-gradient(100% 448.78% at 0% 100%, #a01a68 0%, #262626 100%);
		}

		&.tier--2 {
			background: radial-gradient(100% 448.78% at 0% 100%, #389000 0%, #884e00 100%);
		}

		&.tier--3 {
			background: radial-gradient(100% 448.78% at 0% 100%, #092003 0%, #1f5208 100%);
		}

		&__title {
		}

		&__value {
			font-size: 1.25rem;
			font-weight: bold;
			margin-top: 0.5rem;
			letter-spacing: 0.0375rem;
		}

		&__action {
			margin-left: 1rem;

			:global(button) {
				text-align: center;
				justify-content: center;
				padding-left: 1rem;
				padding-right: 1rem;
				border-color: rgba(#fff, 0.25);
				width: 100%;
			}
		}
	}
</style>

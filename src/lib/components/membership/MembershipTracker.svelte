<script>
	import { DPANDAMembershipTier } from '$lib/constants/enums'

	import { formatAmount } from '$lib/helper/utils'

	import { wallet } from '$lib/stores/wallet'
	import MembershipCard from '../common/MembershipCard.svelte'
	import WalletNotConnected from '../common/WalletNotConnected.svelte'
	import HeaderWalletAsset from '../header/HeaderWalletAsset.svelte'

	let isConnected = false
	let totalDPANDA = 0
	let dpandaTier = DPANDAMembershipTier.T_EMPTY
	let dpandaLPFactor

	wallet.subscribe((w) => {
		isConnected = w.isConnected
		totalDPANDA = w.totalDPANDA
		dpandaTier = w.dpandaTier
		dpandaLPFactor = w.dpandaLPFactor
	})
</script>

<section class="section">
	<div class="container">
		{#if !isConnected}
			<WalletNotConnected />
		{:else}
			<div class="section__header">
				<h3>Your total DPANDA balance {$wallet.status}</h3>
			</div>

			<div class="section__inner">
				<div class="membership-tracker">
					<div class="membership-tracker__amount">
						{formatAmount(totalDPANDA)}
						<img src="/icons/dpanda.png" alt="DPANDA" />
					</div>

					<div class="membership-tracker__balances">
						<HeaderWalletAsset unit="DPANDA" />
						<HeaderWalletAsset
							unit="ALGO_DPANDA_TM11POOL"
							overrideUnitName="DPANDA"
							calculationFactor={dpandaLPFactor}
						/>
						<HeaderWalletAsset
							unit="YLDY_DPANDA_TM11POOL"
							overrideUnitName="DPANDA"
							calculationFactor={dpandaLPFactor}
						/>
					</div>
				</div>

				{#if dpandaTier !== DPANDAMembershipTier.T_EMPTY}
					<div class="membership-tracker__card">
						<MembershipCard wallet={$wallet.account} tier={dpandaTier} />
					</div>
				{/if}
			</div>
		{/if}
	</div>
</section>

<style lang="scss">
	.section {
		background-color: #000;
	}

	.section__header {
		margin-bottom: 1.5rem;
	}

	.section__inner {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;

		@media screen and (min-width: 768px) {
			grid-template-columns: 1.25fr 1fr;
			gap: 4rem;
		}
	}

	h3 {
		font-size: 0.75rem;
		opacity: 0.75;

		@media screen and (min-width: 768px) {
			font-size: 1rem;
		}
	}

	.membership-tracker {
		display: flex;
		flex-direction: column;

		&__amount {
			font-size: 2.25rem;

			@media screen and (min-width: 768px) {
				font-size: 3.75rem;
			}

			img {
				width: 1.25rem;

				@media screen and (min-width: 768px) {
					width: 2.75rem;
				}
			}
		}

		&__balances {
			margin-top: 2rem;

			@media screen and (min-width: 768px) {
				margin-top: 4rem;
				max-width: 520px;
			}

			:global(.header-wallet-asset__logo img) {
				width: 2.25rem;
			}
		}

		&__card {
			display: flex;
			justify-content: center;
			align-items: center;
			min-width: 0;
			margin-top: 2rem;

			@media screen and (min-width: 768px) {
				margin-top: 0;
			}

			:global(svg) {
				max-width: 90%;
				height: auto;

				@media screen and (min-width: 768px) {
					max-width: 80%;
				}
			}
		}

		&__subtitle {
			font-size: 1.125rem;
			margin-top: 2rem;
		}
	}
</style>

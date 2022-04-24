<script>
	import { getMembershipTiers } from '$lib/helper/membershipTiers'
	import MembershipFeatureColumn from './MembershipFeatureColumn.svelte'

	let tiers = getMembershipTiers()
</script>

<section class="section">
	<div class="container">
		<div class="section__header">
			<h3>Membership Tiers</h3>
		</div>

		<div class="membership-features">
			<div class="membership-features__columns">
				{#each tiers as tier}
					<MembershipFeatureColumn tier={tier.tier} title={tier.title} />
				{/each}
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	.membership-features {
		&__columns {
			display: grid;
			grid-template-columns: 1fr;
			gap: 4rem;

			@media screen and (min-width: 768px) {
				grid-template-columns: 1fr 1fr 1fr;
				gap: 4rem;
			}
		}
	}
</style>

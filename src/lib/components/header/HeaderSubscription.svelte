<script lang="ts">
	import { goto } from '$app/navigation'
	import { Button } from 'carbon-components-svelte'

	const goToMembership = () => {
		goto('/membership')
	}
</script>

<div class="header-subscription">
	<div>
		<div class="header-subscription__title">Membership Tier #1</div>

		<div class="header-subscription__tiers">
			<!-- <ProgressIndicator spaceEqually>
				<ProgressStep label="Tier #1" size={2}/>
				<ProgressStep label="Tier #2" size={2}/>
				<ProgressStep label="Tier #3" size={2}/>
			</ProgressIndicator> -->
		</div>
	</div>

	<div class="header-subscription__action">
		<Button size="small" kind="tertiary" on:click={goToMembership}>View</Button>
	</div>
</div>

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

		&__title {
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

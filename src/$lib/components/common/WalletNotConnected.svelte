<script lang="ts">
	import ConnectWallet from './ConnectWallet.svelte'

	let icon = '/images/working-progress-icon.svg'
	let title = 'Wallet Not Connected'
	let description = 'Connect your wallet to access'
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

	<div class="action">
		<ConnectWallet />
	</div>
</div>

<style lang="scss">
	.empty-tab {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		min-height: 300px;
		padding: 4rem;

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

		.action {
			margin-top: 2rem;
		}
	}
</style>

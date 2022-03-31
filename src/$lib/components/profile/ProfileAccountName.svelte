<script lang="ts">
	import { CopyButton } from 'carbon-components-svelte'
	import { formatWallet } from '../../../$lib/helper/utils'

	export let name: string
	export let handle: string
	export let account: string
</script>

<div class="profile-account-name">
	{#if name || (name && handle)}
		<div class="profile-account-name__meta">
			<div class="profile-account-name__name">{name}</div>
			{#if handle}
				<div class="profile-account-name__handle gradient-highlight">@{handle}</div>
			{/if}
		</div>
	{/if}

	<div class="profile-account-name__account {name || handle ? 'style-muted' : ''}">
		{formatWallet(account, 9)}
		<CopyButton kind="ghost" text={account} />
	</div>
</div>

<style lang="scss">
	.profile-account-name {
		&__name {
			font-size: 1.5rem;
			font-weight: bold;
		}

		&__meta {
			display: flex;
			align-items: center;
			margin-bottom: 0.5rem;
		}

		&__handle {
			font-size: 1.125rem;
			line-height: 1.3;
			margin-left: 1rem;
		}

		&__account {
			font-size: 1.125rem;
			display: flex;
			align-items: center;

			&.style-muted {
				font-size: 0.875rem;
				opacity: 0.5;
			}

			:global(button) {
				width: 1.5rem;
				height: 1.5rem;
				margin-left: 1rem;

				color: #fff;
				background-color: transparent;
			}
		}
	}
</style>

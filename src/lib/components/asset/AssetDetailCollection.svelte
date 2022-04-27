<script lang="ts">
	import ProfileAccountName from '../profile/ProfileAccountName.svelte'
	import ProfileAvatar from '../profile/ProfileAvatar.svelte'

	export let id: number
	export let creator: string
</script>

<div class="asset-collection">
	<ProfileAvatar identifier={creator} />
	<ProfileAccountName name={null} handle={null} account={creator} />
</div>

<style lang="scss">
	.asset-collection {
		display: flex;
		align-items: center;

		:global(.profile-avatar) {
			width: 44px !important;
			height: 44px !important;
			margin-right: 1rem;
		}

		:global(.profile-account-name__name) {
			font-size: 1.375rem;
			font-weight: 500;
		}

		:global(.profile-account-name__account) {
			font-size: 0.875rem;
			
			@media screen and (min-width: 768px) {
				font-size: 1rem;
			}
		}

		:global(.profile-account-name__handle) {
			font-size: 1rem;
		}

		:global(.profile-account-name__meta) {
			margin-bottom: 0.25rem;
		}
	}
</style>

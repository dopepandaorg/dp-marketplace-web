<script lang="ts">
	import EmptyTab from '$lib/components/common/EmptyTab.svelte'
	import ProfileContentSkeleton from '$lib/components/profile/ProfileContentSkeleton.svelte'
	import { LoadingStatus } from '$lib/constants/enums'
	import AssetTile from '$lib/components/common/AssetTile.svelte'
	import { onMount } from 'svelte'
	import { wallet } from '$lib/stores/wallet'

	let walletAssets = []
	let status = LoadingStatus.IN_PROGRESS

	onMount(() => {
		fetch(`/api/wallet/${$wallet.account}/assets.json`)
			.then((response) => response.json())
			.then((body) => {
				walletAssets = body.assets.filter((a) => a.amount > 0)
			})
			.finally(() => (status = LoadingStatus.SUCCESS))
	})
</script>

<div class="profile-assets">
	{#if status === LoadingStatus.IN_PROGRESS}
		<ProfileContentSkeleton />
	{:else if status === LoadingStatus.SUCCESS && walletAssets.length > 0}
		<div class="profile-assets__list">
			{#each walletAssets as asset}
				<AssetTile id={asset['asset-id']} amount={asset.amount} />
			{/each}
		</div>
	{:else}
		<EmptyTab
			title="You have no NFT creations :("
			description="You can change the network you're on, or join us as a Beta tester and get early access to more features!"
		/>
	{/if}
</div>

<style lang="scss">
	.profile-assets {
		&__list {
			display: grid;
			grid-template-columns: 1fr;
			gap: 2rem;

			@media screen and (min-width: 768px) {
				grid-template-columns: 1fr 1fr;
			}

			@media screen and (min-width: 992px) {
				grid-template-columns: 1fr 1fr 1fr 1fr;
			}
		}
	}
</style>

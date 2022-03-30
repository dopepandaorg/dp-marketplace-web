<script lang="ts">
	import { assets, syncWalletAssets } from '../../stores/assets'
	import { onDestroy, onMount } from 'svelte'
	import EmptyTab from '../../$lib/components/common/EmptyTab.svelte'
	import ProfileContentSkeleton from '../../$lib/components/profile/ProfileContentSkeleton.svelte'
	import { LoadingStatus } from '../../$lib/constants/enums'
	import AssetTile from '../../$lib/components/common/AssetTile.svelte'

	let walletAssets = []
	let status = LoadingStatus.IN_PROGRESS

	const assetsSub = assets.subscribe((a) => {
		status = a.status
		walletAssets = a.opted
	})

	onDestroy(assetsSub)
	onMount(() => {
		syncWalletAssets()
	})
</script>

<div class="profile-assets">
	{#if status === LoadingStatus.IN_PROGRESS}
		<ProfileContentSkeleton />
	{:else if status === LoadingStatus.SUCCESS && walletAssets.length > 0}
		<div class="profile-assets__list">
			{#each walletAssets as asset}
				<AssetTile id={asset['asset-id']} />
			{/each}
		</div>
	{:else}
		<EmptyTab
			title="You have no NFT creations :("
			description="You can change the network you're on. Or Buy you first NFT from the Marketplace"
		/>
	{/if}
</div>

<style lang="scss">
	.profile-assets {
		&__list {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr 1fr;
			gap: 2rem;

			border-radius: 5px;
		}
	}
</style>

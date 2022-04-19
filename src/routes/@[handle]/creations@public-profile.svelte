<script lang="ts">
	import { assets, syncWalletAssets } from '$lib/stores/assets'
	import { onDestroy, onMount } from 'svelte'
	import EmptyTab from '$lib/components/common/EmptyTab.svelte'
	import ProfileContentSkeleton from '$lib/components/profile/ProfileContentSkeleton.svelte'
	import { LoadingStatus } from '$lib/constants/enums'
	import EmptyPage from '$lib/components/common/EmptyPage.svelte'
	import AssetTile from '$lib/components/common/AssetTile.svelte'

	let walletAssets = []
	let status = LoadingStatus.IN_PROGRESS

	const assetsSub = assets.subscribe((a) => {
		status = a.status
		walletAssets = a.created
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
		<!-- <div class="profile-assets__list">
			{#each walletAssets as asset}
				<AssetTile id={asset['asset-id']} />
			{/each}
		</div> -->

		<EmptyPage
			icon="/images/restricted-access-icon.svg"
			title="Access Restricted"
			description="This feature is only available to Beta testers"
		/>
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

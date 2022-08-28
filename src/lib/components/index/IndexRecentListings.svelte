<script lang="ts">
	import { Q_GET_ESCROW_LISTING_RECENT } from '$lib/constants/queries'
	import { operationStore, query } from '@urql/svelte'
	import AssetTile from '../common/AssetTile.svelte'
	import ProfileContentSkeleton from '../profile/ProfileContentSkeleton.svelte'

	const listingsQuery = operationStore<any>(Q_GET_ESCROW_LISTING_RECENT)
	query(listingsQuery)
</script>

<section class="section">
	<div class="container">
		<div class="section__header">
			<h3>Recent Listings</h3>
		</div>

		{#if $listingsQuery.fetching}
			<ProfileContentSkeleton />
		{:else if $listingsQuery.data.escrow_listings}
			<div class="listings">
				{#each $listingsQuery.data.escrow_listings as listing}
					<AssetTile id={listing.asset_id} showListing />
				{/each}
			</div>
		{/if}
	</div>
</section>

<style lang="scss">
	.listings {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 2rem;
	}
</style>

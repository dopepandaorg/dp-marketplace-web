<script lang="ts">
	import EmptyTab from '$lib/components/common/EmptyTab.svelte'
	import ProfileContentSkeleton from '$lib/components/profile/ProfileContentSkeleton.svelte'
	import { operationStore, query } from '@urql/svelte'
	import { Q_GET_COLLECTIONS_BY_CREATOR } from '$lib/constants/queries'
	import CreateCollectionWithTx from '$lib/components/transactions/CreateCollectionWithTx.svelte'
	import { wallet } from '$lib/stores/wallet'
import CollectionListTable from '$lib/components/collection/CollectionListTable.svelte'

	const collectionQuery = operationStore<any>(Q_GET_COLLECTIONS_BY_CREATOR, {
		creator: $wallet.account
	})
	query(collectionQuery)

	const goToCollection = (e: CustomEvent) => {
		collectionQuery.reexecute({ requestPolicy: 'network-only' })
	}
</script>

<div class="profile-collections">
	{#if $collectionQuery.fetching}
		<ProfileContentSkeleton />
	{:else if $collectionQuery.data && $collectionQuery.data.collections}
		<div class="profile-collections__head">
			<h4>All Collections</h4>
			<CreateCollectionWithTx on:create={goToCollection} />
		</div>

		<div class="profile-collections__list">
			<CollectionListTable collections={$collectionQuery.data.collections}/>
			<!-- <table>
				<thead>
					<tr>
						<th>Collection</th>
						<th>Floor</th>
						<th>24h Volume</th>
						<th>Total Volume</th>
						<th>Items</th>
					</tr>
				</thead>
				<tbody>
					{#each $collectionQuery.data.collections as collection, _i}
						<tr>
							<td
								><a href="/collections/{collection.slug || collection.id}">{collection.title}</a
								></td
							>
							<td>
								{collection.collections_analytics_1ds[0]
									? collection.collections_analytics_1ds[0].floor_price
									: 0}
							</td>
							<td>
								{collection.collections_analytics_1ds[0]
									? collection.collections_analytics_1ds[0].volume
									: 0}
							</td>
							<td>
								{collection.collections_analytics_1ds_aggregate.aggregate.sum.volume
									? collection.collections_analytics_1ds_aggregate.aggregate.sum.volume
									: 0}
							</td>
							<td>
								{collection.collections_analytics_1ds[0]
									? collection.collections_analytics_1ds[0].total_items
									: 0}
							</td>
						</tr>
					{/each}
				</tbody>
			</table> -->
		</div>
	{:else}
		<EmptyTab
			title="You have no collections :("
			description="You can change the network you're on. Or Buy you first NFT from the Marketplace"
		/>
	{/if}
</div>

<style lang="scss">
	.profile-collections {
		&__head {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 2rem;

			h4 {
				font-weight: bold;
			}
		}

		&__list {
			display: grid;
			grid-template-columns: 1fr;
			gap: 2rem;
		}
	}
</style>

<script lang="ts">
	import EmptyTab from '$lib/components/common/EmptyTab.svelte'
	import ProfileContentSkeleton from '$lib/components/profile/ProfileContentSkeleton.svelte'
	import { operationStore, query } from '@urql/svelte'
	import { Q_GET_COLLECTIONS_BY_CREATOR } from '$lib/constants/queries'
	import { Button } from 'carbon-components-svelte'
	import { goto } from '$app/navigation'
	import CreateCollectionWithTx from '$lib/components/transactions/CreateCollectionWithTx.svelte'

	const collections = operationStore<any>(Q_GET_COLLECTIONS_BY_CREATOR, {
		creator: 'R2HPT36QHQUDAKJ2GICQLNDRKQB34RMJRXXUBVSMPMKFHOEU6GZTSJ6KDY'
	})
	query(collections)

	const createCollection = () => {
		goto('/profile/collections/create')
	}
</script>

<div class="profile-collections">
	{#if $collections.fetching}
		<ProfileContentSkeleton />
	{:else if $collections.data && $collections.data.collections}
		<div class="profile-collections__head">
			<h4>All Collections</h4>
			<CreateCollectionWithTx />
		</div>

		<div class="profile-collections__list">
			<table>
				<thead>
					<tr>
						<th>Rank</th>
						<th>Collection</th>
						<th>Floor</th>
						<th>24h Volume</th>
						<th>Total Volume</th>
						<th>Items</th>
					</tr>
				</thead>
				<tbody>
					{#each $collections.data.collections as collection, _i}
						<tr>
							<td>{_i + 1}</td>
							<td
								><a href="/collections/{collection.slug || collection.id}">{collection.title}</a
								></td
							>
						</tr>
					{/each}
				</tbody>
			</table>
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

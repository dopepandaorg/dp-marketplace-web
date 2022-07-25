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
			<CollectionListTable collections={$collectionQuery.data.collections} />
		</div>
	{:else}
		<div class="profile-collections__head">
			<h4>All Collections</h4>
			<CreateCollectionWithTx on:create={goToCollection} />
		</div>

		<EmptyTab
			title="You have no collections :("
			description="You may select 'Create Collection' to create your first collection."
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

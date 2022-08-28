<script lang="ts">
	import EmptyTab from '$lib/components/common/EmptyTab.svelte'
	import ProfileContentSkeleton from '$lib/components/profile/ProfileContentSkeleton.svelte'
	import { operationStore, query } from '@urql/svelte'
	import { Q_GET_COLLECTIONS_BY_CREATOR } from '$lib/constants/queries'
	import CollectionListTable from '$lib/components/collection/CollectionListTable.svelte'
	import { getContext } from 'svelte'
	import type { Writable } from 'svelte/store'
	import type { ProfileRecord } from '$lib/interfaces/profile'

	const profileWallet = getContext<Writable<ProfileRecord>>('profile-wallet')

	let wallet = null
	profileWallet.subscribe((pw) => {
		wallet = pw
	})

	const collectionQuery = operationStore<any>(Q_GET_COLLECTIONS_BY_CREATOR, {
		creator: wallet
	})

	query(collectionQuery)
</script>

<div class="profile-collections">
	{#if $collectionQuery.fetching}
		<ProfileContentSkeleton />
	{:else if $collectionQuery.data && $collectionQuery.data.collections.length > 0}
		<div class="profile-collections__head">
			<h4>All Collections</h4>
		</div>

		<div class="profile-collections__list">
			<CollectionListTable collections={$collectionQuery.data.collections} />
		</div>
	{:else}
		<div class="profile-collections__head">
			<h4>All Collections</h4>
		</div>

		<EmptyTab
			title="There are no collections here :("
			description="You may find my creations under 'Overview' or 'Creations'."
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

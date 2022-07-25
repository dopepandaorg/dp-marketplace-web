<script lang="ts">
	import { operationStore, query } from '@urql/svelte'
	import { Q_GET_COLLECTION, Q_GET_COLLECTION_BY_SLUG } from '$lib/constants/queries'
	import { page } from '$app/stores'

	import { InlineNotification } from 'carbon-components-svelte'
	import CollectionDetailPlaceholder from '$lib/components/collection/CollectionDetailPlaceholder.svelte'
	import { checkValidUUID } from '$lib/helper/stringUtils'
	import { writable } from 'svelte/store'
	import type { CollectionRecord } from '$lib/interfaces/collection'
	import { setContext } from 'svelte'
	import CollectionHeader from '$lib/components/collection/CollectionHeader.svelte'

	const slug = $page.params.slug
	const isUUID = checkValidUUID(slug)

	const collectionItems = writable<number>(0)
	const collectionData = writable<CollectionRecord>(null)
	const collectionQuery = operationStore(
		isUUID ? Q_GET_COLLECTION : Q_GET_COLLECTION_BY_SLUG,
		isUUID ? { id: slug } : { slug }
	)

	setContext('collection-items', collectionItems)
	setContext('collection-data', collectionData)
	query(collectionQuery)

	collectionQuery.subscribe((c) => {
		if (isUUID && c.data && c.data.collections_by_pk) {
			collectionData.set(c.data.collections_by_pk)
		} else if (c.data && c.data.collections) {
			const cd = c.data.collections.find((dc) => dc.slug === slug)
			collectionData.set(cd)
		}
	})
</script>

<svelte:head>
	<title
		>{$collectionData ? `${$collectionData.title} | Collections` : 'Collections'} | DopePanda</title
	>
</svelte:head>

<div class="page page-collection collection-page">
	<div class="container">
		{#if $collectionQuery.fetching}
			<CollectionDetailPlaceholder />
		{:else if $collectionQuery.error}
			<InlineNotification
				lowContrast
				kind="error"
				title="Error:"
				subtitle={$collectionQuery.error.message}
				hideCloseButton
			/>
		{:else if collectionData}
			<div class="collection-detail__header">
				<CollectionHeader />
			</div>

			<slot />
		{:else}
			<InlineNotification
				lowContrast
				kind="error"
				title="Not Found:"
				subtitle="The contest you are looking for is unavailable"
				hideCloseButton
			/>
		{/if}
	</div>
</div>

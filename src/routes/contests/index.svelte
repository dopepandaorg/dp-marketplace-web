<script lang="ts">
	import { operationStore, query } from '@urql/svelte'
	import { Q_GET_CONTESTS } from '../../$lib/constants/queries'

	import PageHeader from '../../$lib/components/common/PageHeader.svelte'
	import ContestTile from '../../$lib/components/contest/ContestTile.svelte'
	import ContestTilePlaceholder from '../../$lib/components/contest/ContestTilePlaceholder.svelte'
	import { InlineNotification } from 'carbon-components-svelte'

	const contests = operationStore<any>(Q_GET_CONTESTS)
	query(contests)
</script>

<svelte:head>
	<title>Contests | DopePanda</title>
</svelte:head>

<PageHeader title="Contests" subtitle="Participate in ongoing contests and win prizes!" theme={4} />

<div class="wrapper">
	<div class="container">
		{#if $contests.fetching}
			<div class="contests__list">
				<ContestTilePlaceholder />
				<ContestTilePlaceholder />
				<ContestTilePlaceholder />
				<ContestTilePlaceholder />
			</div>
		{:else if $contests.error}
			<InlineNotification
				lowContrast
				kind="error"
				title="Error:"
				subtitle={$contests.error.message}
				hideCloseButton
			/>
		{:else}
			<div class="contests__list">
				{#each $contests.data.contests as contest (contest.id)}
					<ContestTile {contest} />
				{/each}
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.contests__list {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
	}
</style>

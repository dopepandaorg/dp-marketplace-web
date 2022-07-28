<script lang="ts">
	import { operationStore, query } from '@urql/svelte'
	import { Q_GET_CONTESTS } from '$lib/constants/queries'

	import PageHeader from '$lib/components/common/PageHeader.svelte'
	import ContestTile from '$lib/components/contest/ContestTile.svelte'
	import ContestTilePlaceholder from '$lib/components/contest/ContestTilePlaceholder.svelte'
	import { InlineNotification } from 'carbon-components-svelte'

	let isLoading = false
	let activeContests = []
	let pastContests = []

	const contests = operationStore<any>(Q_GET_CONTESTS)
	query(contests)

	contests.subscribe(cq => {
		isLoading = cq.fetching

		if (cq.data && cq.data.contests) {
			activeContests = cq.data.contests
				.filter(c => new Date(c.end_at) >= new Date())
				.sort((a, b) => new Date(b.start_at).getTime() - new Date(a.start_at).getTime())
			
			pastContests = cq.data.contests
				.filter(c => new Date(c.end_at) < new Date())
				.sort((a, b) => new Date(b.start_at).getTime() - new Date(a.start_at).getTime())
		}
	})
</script>

<svelte:head>
	<title>Contests | DopePanda</title>
	<meta name="description" content="Participate in ongoing contests and win prizes!" />
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
			{#if activeContests.length > 0}
				<h2>Active Contests</h2>
				
				<div class="contests__list">
					{#each activeContests as contest (contest.id)}
						<ContestTile {contest} />
					{/each}
				</div>
			{/if}

			{#if pastContests.length > 0}
				<h2>Past Contests</h2>
				
				<div class="contests__list">
					{#each pastContests as contest (contest.id)}
						<ContestTile {contest} />
					{/each}
				</div>
			{/if}
		{/if}
	</div>
</div>

<style lang="scss">
	h2 {
		font-weight: bold;
		margin-bottom: 1.5rem;
	}

	.contests__list {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		margin-bottom: 4rem;

		&:last-of-type {
			margin-bottom: 0;
		}

		@media screen and (min-width: 768px) {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>

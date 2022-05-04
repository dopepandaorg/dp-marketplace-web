<script lang="ts">
	import { operationStore, query } from '@urql/svelte'
	import { Q_GET_CONTEST_BY_SLUG } from '$lib/constants/queries'
	import { page } from '$app/stores'
	import { InlineNotification } from 'carbon-components-svelte'
	import ContestDetailPlaceholder from '$lib/components/contest/ContestDetailPlaceholder.svelte'
	import ContestDetail from '$lib/components/contest/ContestDetail.svelte'

	const slug = $page.params.slug

	const contest = operationStore(Q_GET_CONTEST_BY_SLUG, { slug })
	query(contest)

	let contestData
	contest.subscribe((c) => {
		if (c.data) {
			contestData = c.data.contests.find((dc) => dc.slug === slug)
		}
	})
</script>

<svelte:head>
	<title>{contestData ? `${contestData.title} | Contests` : 'Contests'} | DopePanda</title>
</svelte:head>

<div class="contest-page">
	<div class="wrapper">
		<div class="container">
			{#if $contest.fetching}
				<ContestDetailPlaceholder />
			{:else if $contest.error}
				<InlineNotification
					lowContrast
					kind="error"
					title="Error:"
					subtitle={$contest.error.message}
					hideCloseButton
				/>
			{:else if contestData}
				<ContestDetail
					contest={contestData}
					on:refetchContest={() => contest.reexecute({ requestPolicy: 'network-only' })}
				/>
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
</div>

<style lang="scss">
	.contest-page {
	}
</style>

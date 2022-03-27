<script lang="ts">
	import { operationStore, query } from '@urql/svelte'
	import { Q_GET_CONTESTS } from '../../$lib/constants/queries'

	import PageHeader from '../../$lib/components/common/PageHeader.svelte'

	const contests = operationStore<any>(Q_GET_CONTESTS)
	query(contests)
</script>

<PageHeader title="Contests" subtitle="Participate in ongoing contests and win prizes!" />

<div class="wrapper">
	<div class="container">
		{#if $contests.fetching}
			<li>Loading...</li>
		{:else if $contests.error}
			<li>ERROR: {$contests.error.message}</li>
		{:else}
			{#each $contests.data.contests as contest (contest.id)}
				<li><a href="/contests/{contest.slug}">{contest.title} {contest.slug}</a></li>
			{/each}
		{/if}
	</div>
</div>

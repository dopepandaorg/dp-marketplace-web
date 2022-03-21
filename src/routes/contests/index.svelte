<script lang="ts">
	import { Q_GET_CONTESTS } from '../../$lib/constants/queries'
	import { operationStore, query } from '@urql/svelte'

	const contests = operationStore<any>(Q_GET_CONTESTS)
	query(contests)
</script>

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

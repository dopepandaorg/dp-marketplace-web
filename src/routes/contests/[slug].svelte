<script lang="ts">
	import { operationStore, query } from '@urql/svelte'
	import { Q_GET_CONTEST_BY_SLUG } from '../../$lib/constants/queries'
	import { page } from '$app/stores'

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

<br />
<div class="wrapper">
	<div class="container">
		{#if $contest.fetching}
			<li>Loading...</li>
		{:else if $contest.error}
			<li>ERROR: {$contest.error.message}</li>
		{:else if contestData}
			<li>Found {contestData.title}</li>
		{:else}
			<li>not found</li>
		{/if}
	</div>
</div>

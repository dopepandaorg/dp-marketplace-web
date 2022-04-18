<script lang="ts">
	import { operationStore, subscription } from '@urql/svelte'

	import { ImageLoader } from 'carbon-components-svelte'
	import { Q_SUB_CONTEST_ENTRY_LEADERBOARD } from '$lib/constants/queries'
	import { convertIPFSUrl } from '$lib/constants/assets'

	import type { ContestRecord } from '$lib/interfaces/contest'
	import { ContestStatus, VotingStatus } from '$lib/constants/enums'
	import ContestAssetTile from '../common/ContestAssetTile.svelte'
	import ContestTabs from './ContestTabs.svelte'
	import dayjs from 'dayjs'
	import EmptyTab from '../common/EmptyTab.svelte'
	import { parseAmount } from '$lib/helper/utils'

	export let contest: ContestRecord

	let tabIndex = 0
	let contestEntries = contest.contest_entries
	let status = ContestStatus.UPCOMING
	let votingStatus = VotingStatus.NONE
	let isWeightedVoting = contest.voting_type === 1

	if (dayjs(contest.start_at) <= dayjs() && dayjs(contest.end_at) > dayjs()) {
		status = ContestStatus.ACTIVE

		if (dayjs(contest.voting_start_at) > dayjs()) {
			votingStatus = VotingStatus.PENDING
		} else if (dayjs(contest.start_at) <= dayjs()) {
			votingStatus = VotingStatus.ACTIVE
		}
	} else if (dayjs(contest.start_at) <= dayjs() && dayjs(contest.end_at) <= dayjs()) {
		status = ContestStatus.ENDED
		votingStatus = VotingStatus.ENDED
	}

	const contestVotes = operationStore(Q_SUB_CONTEST_ENTRY_LEADERBOARD, {
		contest_id: contest.id
	})

	subscription(contestVotes).subscribe((cv) => {
		if (cv.data && cv.data.contest_entries_votes) {
			contestEntries = contestEntries.map((ce) => ({ ...ce, votes: 0, weight: 0 }))

			cv.data.contest_entries_votes.map((cev) => {
				const v = cev.contest_entry.contest_entries_votes_aggregate.aggregate.count
				const w = parseAmount(
					cev.contest_entry.contest_entries_votes_aggregate.aggregate.sum.weight_dpanda
				)
				const i = Number(cev.asset_id)

				let index = contestEntries.findIndex((ce) => Number(ce.asset_id) === i)
				contestEntries[index].votes = v
				contestEntries[index].weight = w
			})

			const cloneArray = [...contestEntries]

			if (isWeightedVoting) {
				cloneArray.sort((a, b) => b.weight - a.weight)
			} else {
				cloneArray.sort((a, b) => b.votes - a.votes)
			}

			contestEntries = contestEntries.map((ce) => {
				const rank = cloneArray.findIndex((ca) => ca.asset_id === ce.asset_id)
				return { ...ce, rank: rank + 1, votes: ce.votes || 0, weight: ce.weight || 0 }
			})
		}
	})
</script>

<div class="contest-detail">
	<div class="contest-detail__header">
		<div class="contest-detail__image">
			<div>
				<ImageLoader fadeIn src={convertIPFSUrl(contest.image_cid)} />
			</div>
		</div>
		<div>
			<div class="contest-detail__title">
				<h1>{contest.title}</h1>
			</div>
			<div class="contest-detail__description">
				{@html contest.description}
			</div>
		</div>
	</div>

	<div class="contest-detail__info">
		<div class="contest-detail__image" />
		<div class="contest-detail__prizes" />
	</div>

	<div class="contest-detail__content">
		<div class="contest-detail__nav">
			<ContestTabs bind:tabIndex />
		</div>

		{#if tabIndex === 0}
			<div class="contest-detail__entries">
				{#each [...contestEntries] as entry}
					{#if entry.asset_id}
						<ContestAssetTile
							contestId={contest.id}
							id={Number(entry.asset_id)}
							votes={entry.votes}
							weight={entry.weight}
							rank={entry.rank}
							{votingStatus}
							votingStartTime={contest.voting_start_at}
							{isWeightedVoting}
						/>
					{/if}
				{/each}
			</div>
			{#if contestEntries.length === 0}
				<EmptyTab
					title="This contest is open for entries!"
					description={contest.pending_submission_html && contest.pending_submission_html}
				/>
			{/if}
		{:else if tabIndex === 1}
			{@html contest.prizes_html}
		{:else if tabIndex === 2}
			{@html contest.rules_html}
		{/if}
	</div>
</div>

<style lang="scss">
	.contest-detail {
		&__title {
			h1 {
				font-size: 2.25rem;
			}
		}

		&__image {
			position: relative;
			border-radius: 10px;
			overflow: hidden;
			background-color: var(--dp--black-02);

			> div {
				padding-top: 56.25%;
			}

			:global(img) {
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				top: 0;
				width: 100%;
				height: 100%;

				object-fit: cover;
				object-position: center;
			}
		}

		&__description {
			margin-top: 1rem;
		}

		&__header,
		&__info {
			display: grid;
			grid-template-columns: 1fr;
			gap: 2rem;

			@media screen and (min-width: 768px) {
				grid-template-columns: 1fr 1fr;
				gap: 4rem;
			}
		}

		&__content {
			margin-top: 4rem;
		}

		&__entries {
			display: grid;
			grid-template-columns: 1fr;
			gap: 2rem;

			@media screen and (min-width: 768px) {
				grid-template-columns: 1fr 1fr;
				gap: 4rem;
			}

			@media screen and (min-width: 992px) {
				grid-template-columns: 1fr 1fr 1fr;
				gap: 4rem;
			}
		}
	}
</style>
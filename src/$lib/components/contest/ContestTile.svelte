<script lang="ts">
	import { ImageLoader, SkeletonPlaceholder } from 'carbon-components-svelte'
	import { convertIPFSUrl } from '../../../$lib/constants/assets'
	import { goto } from '$app/navigation'
	import { ContestStatus } from '../../../$lib/constants/enums'
	import type { ContestRecord } from '../../../$lib/interfaces/contest'

	import dayjs from 'dayjs'
	import relativeTime from 'dayjs/plugin/relativeTime'
	import { operationStore, query } from '@urql/svelte'
	import { Q_GET_CONTEST_VOTES } from '../../../$lib/constants/queries'
	import { contestTypes, getOptionValue } from '../../../$lib/constants/options'

	dayjs.extend(relativeTime)

	export let contest: ContestRecord
	let votes = null
	let status = ContestStatus.UPCOMING

	if (dayjs(contest.start_at) <= dayjs() && dayjs(contest.end_at) > dayjs()) {
		status = ContestStatus.ACTIVE
	} else if (dayjs(contest.start_at) <= dayjs() && dayjs(contest.end_at) <= dayjs()) {
		status = ContestStatus.ENDED
	}

	const contestVotes = operationStore<any>(Q_GET_CONTEST_VOTES, { contest_id: contest.id })
	query(contestVotes)

	contestVotes.subscribe((cv) => {
		if (cv.data && cv.data.contest_entries_votes_aggregate) {
			votes = cv.data.contest_entries_votes_aggregate.aggregate.count
		}
	})
</script>

<div
	class="contest-tile"
	on:click={() =>
		(status === ContestStatus.ACTIVE || status === ContestStatus.ENDED) &&
		goto(`/contests/${contest.slug}`)}
>
	<div class="contest-tile__image">
		<div>
			<ImageLoader fadeIn src={convertIPFSUrl(contest.image_cid)} />
		</div>
	</div>
	<div class="contest-tile__content">
		<div class="contest-tile__title-wrap">
			<div class="contest-tile__title">
				<h4>{contest.title}</h4>
			</div>
			<div class="contest-tile__status status--{status}">
				{getOptionValue(status, contestTypes)}
			</div>
		</div>
		<div class="contest-tile__duration">
			{#if status === ContestStatus.ACTIVE}
				{dayjs(contest.end_at).fromNow(true)} remaining
			{:else if status === ContestStatus.ENDED}
				Ended {dayjs().to(contest.end_at)}
			{:else}
				Starts {dayjs().to(contest.start_at)}
			{/if}
		</div>
		<div class="contest-tile__meta">
			<div class="contest-tile__meta-item entries">
				{contest.contest_entries_aggregate.aggregate.count} entries
			</div>
			{#if $contestVotes.fetching}
				<SkeletonPlaceholder style="height: 1rem; width: 4rem;" />
			{:else}
				<div class="contest-tile__meta-item votes">{votes} votes</div>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.contest-tile {
		background-color: var(--dp--black-03);
		border-radius: 10px;
		overflow: hidden;

		&:hover {
			cursor: pointer;
		}

		&__image {
			position: relative;

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

		&__content {
			padding: 1rem 1rem 1.125rem;

			@media screen and (min-width: 768px) {
				padding: 1.25rem 1.25rem 1.5rem;
			}
		}

		&__title-wrap {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		&__title {
			h4 {
				font-size: 1.25rem;
				font-weight: 500;
				line-height: 1.1;
				margin: 0;

				@media screen and (min-width: 768px) {
					font-size: 1.5rem;
				}
			}
		}

		&__status {
			font-size: 0.75rem;
			min-width: 100px;
			display: flex;
			justify-content: flex-end;
			align-items: center;

			@media screen and (min-width: 768px) {
				font-size: 0.875rem;
			}

			&:before {
				content: '';
				display: flex;
				float: left;

				width: 0.875rem;
				height: 0.875rem;
				border-radius: 50%;
				background-color: green;
				margin-right: 0.5rem;

				@media screen and (min-width: 768px) {
					width: 1rem;
					height: 1rem;
				}
			}

			&.status--active {
				&::before {
					background-color: #33ff00;
				}
			}
			&.status--upcoming {
				&::before {
					background-color: orange;
				}
			}
			&.status--ended {
				&::before {
					background-color: red;
				}
			}
		}

		&__duration {
			font-size: 0.75rem;
			opacity: 0.5;
			margin-top: 0.5rem;

			@media screen and (min-width: 768px) {
				font-size: 0.875rem;
			}
		}

		&__meta {
			margin-top: 1.5rem;
			display: flex;
		}

		&__meta-item {
			margin-right: 1rem;

			@media screen and (min-width: 768px) {
				font-size: 1rem;
			}
		}
	}
</style>

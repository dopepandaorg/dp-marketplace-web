<script lang="ts">
	import type { CollectionRecord } from '$lib/interfaces/collection'
	import { ImageLoader } from 'carbon-components-svelte'
	import { convertIPFSCIDToUrl } from '$lib/constants/assets'

	export let collections: CollectionRecord[]
</script>

<table>
	<thead>
		<tr>
			<th />
			<th>Collection</th>
			<th>Floor Price</th>
			<th>24h Volume</th>
			<th>Total Volume</th>
			<th>No. Items</th>
		</tr>
	</thead>
	<tbody>
		{#each collections as collection, _i}
			<tr>
				<td>
					<ImageLoader src={convertIPFSCIDToUrl(collection.avatar_cid)} />
				</td>
				<td><a href="/collections/{collection.slug || collection.id}">{collection.title}</a></td>
				<td>
					{collection.collections_analytics_1ds[0]
						? collection.collections_analytics_1ds[0].floor_price
						: 0}
				</td>
				<td>
					{collection.collections_analytics_1ds[0]
						? collection.collections_analytics_1ds[0].volume
						: 0}
				</td>
				<td>
					{collection.collections_analytics_1ds_aggregate.aggregate.sum.volume
						? collection.collections_analytics_1ds_aggregate.aggregate.sum.volume
						: 0}
				</td>
				<td>
					{collection.collections_analytics_1ds[0]
						? collection.collections_analytics_1ds[0].total_items
						: 0}
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<style lang="scss">
	table {
		width: 100%;
		text-align: left;
		border-collapse: collapse;
		border-radius: 10px;
		overflow: hidden;

		thead tr,
		tbody tr {
			@media screen and (max-width: 767px) {
				th:nth-child(1),
				td:nth-child(1),
				th:nth-child(3),
				td:nth-child(3),
				th:nth-child(6),
				td:nth-child(6) {
					display: none;
				}

				td:nth-child(2) {
					font-size: 0.625rem;
					padding-left: 0.5rem;
					padding-right: 0.5rem;
				}
			}
		}

		tr th {
			font-size: 0.875rem;
			font-weight: 500;
			color: #fff;
			background-color: var(--dp--black-02);
			padding: 1.25rem 1.5rem;

			@media screen and (max-width: 767px) {
				font-size: 0.75rem;
				padding-top: 1rem;
				padding-bottom: 1rem;
			}
		}

		tr td {
			color: #fff;
			background-color: var(--dp--black-03);
			font-size: 0.75rem;
			padding: 1rem 0.75rem;
			border-top: 1px solid var(--dp--black-05);

			@media screen and (min-width: 768px) {
				font-size: 1rem;
				padding: 1.5rem 1.5rem;
			}

			&:first-child {
				padding-top: 0;
				padding-bottom: 0;
				vertical-align: middle;
			}

			a {
				color: #fff;
				text-decoration: none;
				border-bottom: 1px solid #fff;
			}

			:global(img) {
				width: 2.5rem;
				height: 2.5rem;
				object-fit: contain;

				float: left;
			}

			span {
				display: block;
				font-size: 0.625rem;
				padding-top: 0.25rem;
				opacity: 0.5;

				@media screen and (min-width: 768px) {
					font-size: 0.75rem;
				}

				a {
					color: #fff;
				}
			}

			.flex-row {
				display: flex;
				flex-direction: column;

				@media screen and (min-width: 768px) {
					align-items: center;
					justify-content: center;
					flex-direction: row;
				}

				> div {
					padding: 0 1rem;
				}
			}
		}

		img.token-image {
			position: relative;
			top: 2px;
			width: 1.125rem;
			height: 1.125rem;

			@media screen and (max-width: 767px) {
				width: 0.875rem;
				height: 0.875rem;
			}
		}

		.stake-item {
			display: flex;
			align-items: center;
			text-align: left;

			img {
				position: relative;
				top: 2px;
				width: 2rem;
				height: 2rem;
				margin-right: 0.5rem;

				@media screen and (max-width: 767px) {
					width: 1.25rem;
					height: 1.25rem;
				}
			}

			img + img {
				margin-left: -1.25rem;
			}
		}
	}
</style>

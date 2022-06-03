<script lang="ts">
	import { getContext } from 'svelte'
	import type { Writable } from 'svelte/store'
	import type { OperationStore } from '@urql/svelte'
	import type { ProfileRecord } from '$lib/interfaces/profile'
	import { Button, SkeletonPlaceholder } from 'carbon-components-svelte'
	import AssetTile from '../common/AssetTile.svelte'
	import ProfileShowcaseTileSelector from './ProfileShowcaseTileSelector.svelte'
	import UpdateProfileShowcaseTx from '../transactions/UpdateProfileShowcaseTx.svelte'
	import TrashCanIcon from 'carbon-icons-svelte/lib/TrashCan.svelte'

	export let isEditable: boolean

	let isLoading = false
	let isPristine = true
	let featuredGallery = [null, null, null, null, null, null, null, null]

	const profileData = getContext<Writable<ProfileRecord>>('profile-data')
	profileData.subscribe((pd) => {
		isLoading = !pd.wallet

		if (pd.featured_gallery) {
			featuredGallery = pd.featured_gallery
			isPristine = true
		}
	})

	const onSelect = (id: number, i: number) => {
		featuredGallery[i] = id
		isPristine = false
	}

	const onSubmit = () => {
		const profileQuery = getContext<OperationStore>('profile-query')

		if (profileQuery) {
			profileQuery.reexecute({ requestPolicy: 'network-only' })
		}
	}
</script>

{#if isLoading}
	<div class="profile-showcase">
		<h4><SkeletonPlaceholder style="width: 200px; height: 1.5rem;" /></h4>

		<div class="profile-showcase__grid">
			<AssetTile id={null} />
			<AssetTile id={null} />
			<AssetTile id={null} />
			<AssetTile id={null} />
			<AssetTile id={null} />
			<AssetTile id={null} />
			<AssetTile id={null} />
			<AssetTile id={null} />
		</div>
	</div>
{:else}
	<div class="profile-showcase">
		<div class="profile-showcase__title">
			<h4>Profile Showcase</h4>

			{#if !isPristine}
				<UpdateProfileShowcaseTx {featuredGallery} on:complete={onSubmit}/>
			{/if}
		</div>

		<div class="profile-showcase__grid">
			{#each featuredGallery as gridId, i}
				{#if gridId}
					<div class="profile-showcase__item">
						<AssetTile id={gridId}>
							<svelte:fragment slot="empty">
								<ProfileShowcaseTileSelector
									index={i}
									{isEditable}
									on:select={(e) => onSelect(e.detail.id, i)}
								/>
							</svelte:fragment>
						</AssetTile>

						<div class="profile-showcase__item-close">
							<Button
								kind="danger"
								size="small"
								icon={TrashCanIcon}
								iconDescription="Remove Asset"
								on:click={() => onSelect(null, i)}
							/>
						</div>
					</div>
				{:else}
					<ProfileShowcaseTileSelector
						index={i}
						{isEditable}
						on:select={(e) => onSelect(e.detail.id, i)}
					/>
				{/if}
			{/each}
		</div>
	</div>
{/if}

<style lang="scss">
	.profile-showcase {
		h4 {
			font-weight: bold;
		}

		&__title {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}

	.profile-showcase__grid {
		display: grid;
		grid-template-columns: 1fr;
		margin-top: 2rem;
		gap: 2rem;

		@media screen and (min-width: 768px) {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.profile-showcase__item {
		position: relative;

		&-close {
			position: absolute;
			top: 0.5rem;
			right: 0.5rem;
		}
	}
</style>

<script lang="ts">
	import { getContext } from 'svelte'
	import type { Writable } from 'svelte/store'
	import type { ProfileRecord } from '$lib/interfaces/profile'
	import { SkeletonPlaceholder } from 'carbon-components-svelte'
	import AssetTile from '../common/AssetTile.svelte'
	import ProfileShowcaseTileSelector from './ProfileShowcaseTileSelector.svelte'

	let isLoading = false
	let showcaseGrid = [null, null, 87797799, null, null, null, 87797799, null]

	const profileData = getContext<Writable<ProfileRecord>>('profile-data')
	profileData.subscribe((pd) => {
		isLoading = !pd.wallet
		// showcaseGrid = pd.featured_gallery
	})
</script>

{#if isLoading}
	<div class="profile-showcase">
		<h4><SkeletonPlaceholder style="width: 200px; height: 1.5rem;" /></h4>

		<div class="profile-showcase__grid">
			<AssetTile id={0} />
		</div>
	</div>
{:else}
	<div class="profile-showcase">
		<h4>Profile Showcase</h4>

		<div class="profile-showcase__grid">
			{#each showcaseGrid as gridId}
				{#if gridId}
					<AssetTile id={gridId}>
						<svelte:fragment slot="empty">
							<ProfileShowcaseTileSelector isEditable={true} />
						</svelte:fragment>
					</AssetTile>
				{:else}
					<ProfileShowcaseTileSelector isEditable={true} />
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
</style>

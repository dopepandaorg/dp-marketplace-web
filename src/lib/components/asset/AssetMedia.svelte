<script lang="ts">
	import { convertIPFSUrlOnly } from '$lib/constants/assets'
	import { Button, ImageLoader, InlineLoading } from 'carbon-components-svelte'

	export let assetUrl
	let imageLoader
	let imageLoaderError
</script>

<div class="asset-media">
	<ImageLoader
		fadeIn
		bind:this={imageLoader}
		bind:error={imageLoaderError}
		src={convertIPFSUrlOnly(assetUrl)}
	>
		<svelte:fragment slot="loading">
			<div class="asset-tile__image__inner">
				<InlineLoading />
			</div>
		</svelte:fragment>
		<svelte:fragment slot="error">
			<div class="asset-tile__image__inner">
				<Button
					kind="ghost"
					on:click={(e) => {
						e.preventDefault()
						e.stopPropagation()
						imageLoader.loadImage(convertIPFSUrlOnly(assetUrl))
					}}
				>
					Error. Try again
				</Button>
			</div>
		</svelte:fragment>
	</ImageLoader>
</div>

<style lang="scss">
	.asset-media {
		display: flex;
		align-items: center;
		justify-content: center;

		height: 100%;
		border-radius: 8px;
		
		:global(img) {
			width: auto !important;
			max-width: 100%;
			max-height: 100%;
			background-color: transparent;
	
			border-radius: 8px;
		}
	}

</style>

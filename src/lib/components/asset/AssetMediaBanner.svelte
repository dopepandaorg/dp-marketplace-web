<script lang="ts">
	import AssetMedia from './AssetMedia.svelte'

	export let assetUrl: string
</script>

<div class="asset-media-banner">
	<div class="asset-media-banner__inner">
		<AssetMedia {assetUrl} />
	</div>
</div>

<style lang="scss">
	.asset-media-banner {
		display: flex;
		align-items: center;
		justify-content: center;

		background-color: var(--dp--black-02);
		height: 50vh;

		@media screen and (min-width: 768px) {
			height: 55vh;
		}

		&__inner {
			width: 90%;
			height: 90%;
		}
	}
</style>

<script lang="ts">
	import { convertIPFSUrl } from '$lib/constants/assets'

	export let assetUrl
</script>

<div class="asset-media">
	<img src={convertIPFSUrl(assetUrl)} alt="" />
</div>

<style lang="scss">
	.asset-media {
		height: 100%;
		border-radius: 8px;
	}

	img {
		max-width: 100%;
		max-height: 100%;
		background-color: transparent;

		border-radius: 8px;
	}
</style>

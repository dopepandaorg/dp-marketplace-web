<script lang="ts">
	import { convertIPFSUrlOnly } from '$lib/constants/assets'

	export let assetUrl
</script>

<div class="asset-media">
	<img src={convertIPFSUrlOnly(assetUrl)} alt="" />
</div>

<style lang="scss">
	.asset-media {
		display: flex;
		align-items: center;
		justify-content: center;

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

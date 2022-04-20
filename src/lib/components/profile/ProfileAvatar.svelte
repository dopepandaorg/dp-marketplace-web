<script lang="ts">
	import { convertIPFSCIDToUrl } from '$lib/constants/assets'
	import { ImageLoader } from 'carbon-components-svelte'
	import { toSvg } from 'jdenticon'

	export let avatar_cid = null
	export let identifier = null
	export let size = 140

	let defaultAvatarSvg = ''
	if (identifier) {
		defaultAvatarSvg = toSvg(identifier, size, {
			hues: [296],
			lightness: {
				color: [0.73, 1.0],
				grayscale: [0.74, 1.0]
			},
			saturation: {
				color: 0.32,
				grayscale: 0.29
			},
			backColor: 'transparent',
			padding: 0.175
		})
	}
</script>

{#if avatar_cid}
	<div class="profile-avatar">
		<ImageLoader src={convertIPFSCIDToUrl(avatar_cid)} />
	</div>
{:else}
	<div class="profile-avatar" style="width: {size}px; height: {size}px">
		{@html defaultAvatarSvg}
	</div>
{/if}

<style lang="scss">
	.profile-avatar {
		border-radius: 50%;
		width: 140px;
		height: 140px;
		box-shadow: 0 0 25px #2e2e2e;
		background: linear-gradient(109.08deg, #fd9d5d 0%, #fd2ca0 49.53%, #3397ff 104.51%);

		:global(svg) {
			width: 100%;
			height: auto;
			border-radius: 50%;
			float: left;
		}

		:global(img) {
			float: left;
			width: 100%;
			height: 100%;
			max-width: 100%;
			border-radius: 50%;
			object-fit: cover;
		}
	}
</style>

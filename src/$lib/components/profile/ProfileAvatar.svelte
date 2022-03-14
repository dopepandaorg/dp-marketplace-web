<script lang="ts">
	import { toSvg } from 'jdenticon'
	import { wallet } from '../../../stores/wallet'
	import { onDestroy } from 'svelte'

	let defaultAvatarSvg
	let account

	const walletSub = wallet.subscribe((wallet) => {
		if (account !== wallet.account) {
			account = wallet.account
			defaultAvatarSvg = toSvg(account, 140, {
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
	})

	onDestroy(walletSub)
</script>

<div class="profile-avatar">
	{@html defaultAvatarSvg}
</div>

<style lang="scss">
	.profile-avatar {
		width: 140px;
		height: 140px;

		background: linear-gradient(109.08deg, #fd9d5d 0%, #fd2ca0 49.53%, #3397ff 104.51%);
		border-radius: 50%;

		:global(svg) {
			width: 100%;
			height: auto;
			border-radius: 50%;
		}
	}
</style>

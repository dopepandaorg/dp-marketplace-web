<script lang="ts">
	import { formatWallet } from '$lib/helper/utils'
	import ProfileAvatar from '../profile/ProfileAvatar.svelte'

	export let id: number
	export let creator: string
</script>

<div class="asset-collection">
	<ProfileAvatar identifier={creator} />
	{formatWallet(creator, 8)}
</div>

<style lang="scss">
	.asset-collection {
	}
</style>

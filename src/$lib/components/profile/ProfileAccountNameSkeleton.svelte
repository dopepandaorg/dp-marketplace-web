<script lang="ts">
	import { SkeletonPlaceholder } from 'carbon-components-svelte'
</script>

<div class="profile-account-name">
	<SkeletonPlaceholder style="width: 18rem; height: 1.75rem; margin-bottom: 0.625rem;" />
	<SkeletonPlaceholder style="width: 10rem; height: 1.125rem;" />
</div>

<style>
	.profile-account-name {
		overflow: hidden;
	}
</style>

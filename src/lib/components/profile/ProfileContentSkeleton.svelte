<script lang="ts">
	import { SkeletonPlaceholder } from 'carbon-components-svelte'
</script>

<div class="profile-content">
	<SkeletonPlaceholder />
	<SkeletonPlaceholder />
	<SkeletonPlaceholder />
	<SkeletonPlaceholder />
	<SkeletonPlaceholder />
	<SkeletonPlaceholder />
	<SkeletonPlaceholder />
	<SkeletonPlaceholder />
	<SkeletonPlaceholder />
	<SkeletonPlaceholder />
</div>

<style lang="scss">
	.profile-content {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;

		@media screen and (min-width: 768px) {
			grid-template-columns: 1fr 1fr 1fr 1fr;
		}

		:global(.bx--skeleton__placeholder) {
			width: 100%;
			border-radius: 5px;
			background-color: var(--dp--black-02);
			min-height: 466px;
		}

		:global(.bx--skeleton__placeholder:before) {
			border-radius: 5px;
			background-color: var(--dp--black-03);
		}
	}
</style>

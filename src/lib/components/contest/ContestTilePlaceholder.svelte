<script>
	import { SkeletonPlaceholder } from 'carbon-components-svelte'
</script>

<div class="contest-tile">
	<div class="contest-tile__image">
		<div />
	</div>
	<div class="contest-tile__content">
		<div class="contest-tile__title-wrap">
			<div class="contest-tile__title">
				<SkeletonPlaceholder style="height: 2rem; width: 20rem" />
			</div>
			<div class="contest-tile__status">
				<SkeletonPlaceholder style="height: 1rem; width: 10rem" />
			</div>
		</div>
		<div class="contest-tile__duration">
			<SkeletonPlaceholder style="height: 1rem; width: 5rem" />
		</div>
		<div class="contest-tile__meta">
			<SkeletonPlaceholder style="height: 1.25rem; width: 15rem" />
		</div>
	</div>
</div>

<style lang="scss">
	.contest-tile {
		background-color: var(--dp--black-03);
		border-radius: 10px;
		overflow: hidden;

		&:hover {
			cursor: pointer;
		}

		&__image {
			position: relative;

			> div {
				padding-top: 56.25%;
			}

			:global(img) {
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				top: 0;
				width: 100%;
				height: 100%;

				object-fit: cover;
				object-position: center;
			}
		}

		&__content {
			padding: 1.25rem 1.25rem 1.5rem;
		}

		&__title-wrap {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		&__duration {
			opacity: 0.5;
			margin-top: 0.5rem;
		}

		&__meta {
			font-size: 1rem;
			margin-top: 1.25rem;
		}
	}
</style>

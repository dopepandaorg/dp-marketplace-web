<script>
	import { SkeletonPlaceholder, SkeletonText } from 'carbon-components-svelte'
</script>

<div class="contest-detail">
	<div class="contest-detail__header">
		<div class="contest-detail__image">
			<div />
		</div>
		<div>
			<div class="contest-detail__title">
				<SkeletonPlaceholder style="width: 25rem; max-width: 100%; height: 2.5rem;" />
			</div>
			<div class="contest-detail__description">
				<SkeletonText paragraph lines={5} />
			</div>
		</div>
	</div>

	<div class="contest-detail__info">
		<div class="contest-detail__image" />
		<div class="contest-detail__prizes" />
	</div>
</div>

<style lang="scss">
	.contest-detail {
		&__title {
			h1 {
				font-size: 2.25rem;
			}
		}

		&__image {
			position: relative;
			border-radius: 10px;
			overflow: hidden;
			background-color: var(--dp--black-02);

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

		&__description {
			margin-top: 1rem;
		}

		&__header,
		&__info {
			display: grid;
			grid-template-columns: 1fr;
			gap: 4rem;
			overflow: hidden;

			@media screen and (min-width: 768px) {
				grid-template-columns: 1fr 1fr;
				gap: 4rem;
			}
		}
	}
</style>

<script>
	import { SplideSlide } from '@splidejs/svelte-splide'
	import { Button } from 'carbon-components-svelte'
	import ArrowRightSvelte from 'carbon-icons-svelte/lib/ArrowRight.svelte'
	import ProfileHandleDisplay from '../profile/ProfileHandleDisplay.svelte'

	export let title
	export let creator
	export let image
</script>

<SplideSlide>
	<div class="slide">
		<div class="slide__image">
			<img
				src="https://dopepanda.imgix.net/https%3A%2F%2Fipfs.io%2Fipfs%2Fbafkreicg2nuke7vl55vy55bzio2a7aouemid6toms54jnjtwm3xocux4mi?ixlib=js-3.6.0&s=6dd32166432fb642b72c40cf36dff7b4"
				alt="Image 1"
			/>
		</div>

		<div class="slide__content">
			<div class="slide__title"><h3>{title}</h3></div>
			<div class="slide__meta">
				<ProfileHandleDisplay account={creator} />
				<a href="/contests"><Button kind="tertiary" icon={ArrowRightSvelte}>Participate</Button></a>
			</div>
		</div>
	</div>
</SplideSlide>

<style lang="scss">
	.slide {
		display: flex;
		flex-direction: column;

		img {
			position: absolute;
			top: 0;

			width: 100%;
			height: 101%;
			object-fit: cover;
		}

		&__image {
			position: relative;
			padding-top: 56.25%;
		}

		&__title {
			h3 {
				font-weight: bold;
			}
		}

		&__meta {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 1rem;
		}

		&__content {
			background-color: #000;
			padding: 1.25rem 2rem;
		}
	}
</style>

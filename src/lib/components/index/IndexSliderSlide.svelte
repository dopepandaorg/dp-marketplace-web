<script>
	import { convertIPFSUrl } from '$lib/constants/assets'

	import { SplideSlide } from '@splidejs/svelte-splide'
	import { Button } from 'carbon-components-svelte'
	import ArrowRightSvelte from 'carbon-icons-svelte/lib/ArrowRight.svelte'
	import ProfileHandleDisplay from '../profile/ProfileHandleDisplay.svelte'

	export let title
	export let creator
	export let imageCID
</script>

<SplideSlide>
	<div class="slide">
		<div class="slide__image">
			<img src={convertIPFSUrl(imageCID)} />
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

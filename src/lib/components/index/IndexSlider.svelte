<script>
	import '@splidejs/svelte-splide/css'
	import { Splide } from '@splidejs/svelte-splide'
	import IndexSliderSlide from './IndexSliderSlide.svelte'

	const options = {
		type: 'loop',
		autoplay: true,
		arrows: true
	}
</script>

<div class="index-slider">
	<Splide {options}>
		<IndexSliderSlide
			title="Panda Art Contest #2"
			creator={'M5TWBEMR35KXIQ25R4QW3A5FH6BA7P2QUYUDIIKW3VV2JP3BSRPVZOQFIQ'}
			imageCID={'ipfs://bafkreig6g467qhl2i3qo26uim4c4femjh2yenyesqhvxeomgy4ubq3guqu'}
		/>
		<IndexSliderSlide
			title="Community Meme Contest #2"
			creator={'M5TWBEMR35KXIQ25R4QW3A5FH6BA7P2QUYUDIIKW3VV2JP3BSRPVZOQFIQ'}
			imageCID={'ipfs://bafkreibolnzfpzro32xxtmhwrdyq5c7q2r744a4sko5wj23mv4hnfzdcya'}
		/>
	</Splide>
</div>

<style lang="scss">
	:global(.splide__pagination) {
		position: static;

		display: flex;
		justify-content: flex-start;
		padding: 1rem 0;
	}

	:global(.splide__pagination__page) {
		border-radius: 0.5rem;
		transition: all 0.3s;
	}

	:global(.splide__pagination__page.is-active) {
		width: 1.25rem;
		transform: none;
	}

	:global(.splide__arrows) {
		bottom: 0;
		right: 0;
	}

	:global(.splide__arrow.splide__arrow--prev) {
		display: none;
	}

	:global(.splide__arrow.splide__arrow--next) {
		width: 2rem;
		height: 2rem;
		bottom: 0.375rem;
		right: 0;
		top: auto;
		transform: none;

		background: transparent;
		border: 2px solid rgba(255, 255, 255, 0.75);
		margin-top: -0.5rem;
	}

	:global(.splide__arrow.splide__arrow--next svg) {
		width: 0.75rem;
		height: 0.75rem;
		fill: #fff;
		float: none;
	}

	:global(.splide__track) {
		box-shadow: 0 0 25px rgba(#333, 0.35);
		border-radius: 0.5rem;
	}
</style>

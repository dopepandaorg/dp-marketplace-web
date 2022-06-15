<script>
	import { Splide, SplideSlide } from '@splidejs/svelte-splide'
	import '@splidejs/svelte-splide/css'

	const options = {
		type: 'loop',
		autoplay: true,
		arrows: false,
		height: '15rem'
	}
</script>

<Splide {options}>
	<!-- Insert Slide Options Here -->
</Splide>

<style lang="scss">
	.index-slider {
		background-color: pink;
		border-radius: 4px;

		min-height: 480px;
	}
</style>

<script lang="ts">
	import { Button } from 'carbon-components-svelte'
	import IndexSlider from './IndexSlider.svelte'
</script>

<section class="section section-banner">
	<div class="container">
		<div class="section-banner__inner">
			<div class="section-banner__content">
				<div class="title">
					<h1>Marketplace Headline</h1>
				</div>

				<div class="subtitle">
					<p>Find your favorite content, join like-minded communities & unlock exclusive content</p>
				</div>

				<div class="cta">
					<Button kind="primary">Create</Button>
					<Button kind="tertiary">Explore</Button>
				</div>
			</div>

			<div class="section-banner__slider">
				<IndexSlider />
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	.section-banner {
		background-color: #29a1a8;
	}

	.section-banner__inner {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;

		> div {
			min-width: 0;
		}
	}

	.title {
		margin-top: 2.5rem;
	}

	.subtitle {
		margin-top: 1rem;
		max-width: 85%;

		p {
			font-size: 1.25rem;
		}
	}

	.cta {
		margin-top: 2rem;
	}
</style>

<script lang="ts">
	import { Button } from 'carbon-components-svelte'
	import ImageSearch from 'carbon-icons-svelte/lib/ImageSearch.svelte'
	import IntentRequestCreate from 'carbon-icons-svelte/lib/IntentRequestCreate.svelte'
	import IndexSlider from './IndexSlider.svelte'
</script>

<section class="section section-banner">
	<div class="container">
		<div class="section-banner__inner">
			<div class="section-banner__content">
				<div class="title">
					<h1>Buy, Sell and Trade your NFTs and get rewarded!</h1>
				</div>

				<div class="subtitle">
					<p>DopePanda is a community-first, creator economy ecosystem.</p>
				</div>

				<div class="cta">
					<a href="/create">
						<Button class="cta__primary" kind="primary" icon={IntentRequestCreate}>Create</Button>
					</a>
					<a href="/explore">
						<Button class="cta__secondary" kind="tertiary" icon={ImageSearch}>Explore</Button>
					</a>
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
		background-color: var(--dp--black-03);
		padding-bottom: 2vw;

		&__content {
			margin-bottom: 2rem;
		}
	}

	.section-banner__inner {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;

		align-items: center;

		> div {
			min-width: 0;
		}
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

		:global(.bx--btn) {
			font-size: 1.125rem;
			padding: calc(1.25rem - 3px) 83px calc(1.25rem - 3px) 20px;
		}

		:global(.bx--btn svg) {
			width: 1.5rem;
			height: 1.5rem;
		}

		:global(.cta__primary) {
			margin-right: 1.25rem;
			background: linear-gradient(180deg, #06beb6 0%, #48b1bf 100%);
		}

		:global(.cta__secondary) {
			border-width: 2px;
		}
	}
</style>

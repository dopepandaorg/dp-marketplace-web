<script lang="ts">
	import { Button } from 'carbon-components-svelte'
	import ArrowUpRight from 'carbon-icons-svelte/lib/ArrowUpRight.svelte'
	import Launch from 'carbon-icons-svelte/lib/Launch.svelte'

	export let title: string
	export let subtitle: string = null
	export let size: 'lg' | 'sm' = 'lg'
</script>

<div class="header__wrap">
	<div class="container container-{size}">
		<div class="header">
			<div>
				<h1 class="title">
					{@html title}
				</h1>

				{#if subtitle}
					<div class="subtitle">{subtitle}</div>
				{/if}
			</div>

			<div class="actions">
				<a
					href="https://app.tinyman.org/#/swap?asset_in=0&asset_out=391379500"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Button icon={ArrowUpRight}>Buy on Tinyman</Button>
				</a>
				<a href="https://dopepanda.org/tokenomics" target="_blank">
					<Button kind="ghost" icon={Launch}>View Tokenomics</Button>
				</a>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.container {
		height: 100%;
	}

	.header__wrap {
		padding: 2rem 2rem;
		background: linear-gradient(109.08deg, #fd9d5d 0%, #fd2ca0 49.53%, #3397ff 104.51%);
		background-image: url(/images/bg-header-membership.jpg);
		background-size: cover;
		background-position: center;
		height: 380px;

		@media screen and (min-width: 768px) {
			padding: 4vw 4vw;
		}

		color: #fff;

		.header {
			display: flex;
			flex-direction: column;
			justify-content: center;
			height: 100%;
		}
	}

	.actions {
		display: flex;
		flex-direction: column;
		margin-top: 4rem;

		@media screen and (min-width: 768px) {
			flex-direction: row;
		}

		:global(.bx--btn) {
			margin-top: 1.5rem;

			@media screen and (min-width: 768px) {
				margin-right: 1.5rem;
				margin-top: 0;
			}
		}

		:global(.bx--btn--primary) {
			color: #000;
			background-color: #f2fe67;

			&:hover {
				background-color: darken(#f2fe67, 10%);
			}
		}

		:global(.bx--btn--ghost) {
			color: #fff;
			background-color: rgba(255, 255, 255, 0.125);

			&:hover {
				background-color: rgba(255, 255, 255, 0.25);
			}
		}
	}

	.title {
		font-size: 1.75rem;

		@media screen and (min-width: 768px) {
			font-size: 2.25rem;
			text-align: left;
		}
	}

	.subtitle {
		margin-top: 0.5rem;
		line-height: 1.5;
		max-width: 500px;

		@media screen and (min-width: 768px) {
			font-size: 1.125rem;
			text-align: left;
			margin-top: 1rem;
			line-height: normal;
		}
	}
</style>

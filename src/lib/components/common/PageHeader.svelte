<script lang="ts">
	export let title: string
	export let subtitle: string = null
	export let size: 'lg' | 'sm' = 'lg'
	export let theme = 0
</script>

<div class="header__wrap theme--{theme}">
	<div class="container container-{size}">
		<div class="header">
			<h1 class="title">
				{@html title}
			</h1>

			{#if subtitle}
				<div class="subtitle">{subtitle}</div>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.header__wrap {
		padding: 2rem 2rem;
		background: linear-gradient(109.08deg, #fd9d5d 0%, #fd2ca0 49.53%, #3397ff 104.51%);

		@media screen and (min-width: 768px) {
			padding: 4vw 4vw;
		}

		color: #fff;

		.header {
			display: flex;
			flex-direction: column;
		}

		&.theme--1 {
			background: linear-gradient(180deg, #06beb6 0%, #48b1bf 100%);
		}

		&.theme--2 {
			background: linear-gradient(48deg, #8e54e9 0%, #4776e6 100%);
		}

		&.theme--3 {
			background: linear-gradient(180deg, #ec6f66 0%, #f3a183 100%);
		}

		&.theme--4 {
			background: linear-gradient(180deg, #6a3093 0%, #a044ff 100%);
		}
	}

	.title {
		font-size: 1.75rem;
		text-align: center;

		@media screen and (min-width: 768px) {
			font-size: 2.25rem;
			text-align: left;
		}
	}

	.subtitle {
		margin-top: 0.5rem;
		text-align: center;
		line-height: 1.5;

		@media screen and (min-width: 768px) {
			font-size: 1.125rem;
			text-align: left;
			margin-top: 1rem;
			line-height: normal;
		}
	}
</style>

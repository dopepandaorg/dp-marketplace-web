<script lang="ts">
	export let title: string
	export let subtitle: string = null
	export let size: 'lg' | 'sm' = 'lg'
</script>

<div class="header__wrap">
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
		}
	}

	.title {
		font-size: 1.75rem;
		text-align: center;

		@media screen and (min-width: 767px) {
			font-size: 2.25rem;
			text-align: left;
		}
	}

	.subtitle {
		margin-top: 0.5rem;
		text-align: center;
		line-height: 1.5;

		@media screen and (min-width: 767px) {
			font-size: 1.125rem;
			text-align: left;
			margin-top: 1rem;
			line-height: normal;
		}
	}
</style>

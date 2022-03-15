<script lang="ts">
	export let title: string
	export let subtitle: string = null
</script>

<div class="header__wrap">
	<div class="container-sm">
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
		padding: 4vw 1rem;
		background: linear-gradient(109.08deg, #fd9d5d 0%, #fd2ca0 49.53%, #3397ff 104.51%);
		color: #fff;

		.header {
			display: flex;
			flex-direction: column;
		}
	}

	.title {
		font-size: 1.75rem;

		@media screen and (min-width: 767px) {
			font-size: 2.25rem;
		}
	}

	.subtitle {
		margin-top: 1rem;

		@media screen and (min-width: 767px) {
			font-size: 1.125rem;
		}
	}
</style>

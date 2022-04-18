<script lang="ts">
	import { Link } from 'carbon-components-svelte'
	import { onMount } from 'svelte'

	import QuickNav from './common/QuickNav.svelte'
	import Searchbar from './common/Searchbar.svelte'

	let HeaderMenu

	onMount(async () => {
		HeaderMenu = (await import('./header/HeaderMenu.svelte')).default
	})
</script>

<header>
	<div class="container">
		<div class="header__inner">
			<div class="header__left">
				<div class="header__brand">
					<Link href="/">
						<img src="/favicon.png" alt="DP" />
					</Link>
				</div>
				<div class="header__switch">
					<QuickNav />
				</div>
				<div class="header__search">
					<Searchbar />
				</div>
			</div>
			<div class="header__right">
				<ul class="header__nav">
					<Link href="/explore">Explore</Link>
					<Link href="/create" class="gradient-highlight">CREATE</Link>
				</ul>

				<svelte:component this={HeaderMenu} />
			</div>
		</div>
	</div>
</header>

<style lang="scss">
	header {
		background-color: var(--dp--black-01);
		padding: 0 1rem;

		.header__inner {
			display: flex;
			align-items: center;
			justify-content: space-between;

			min-height: 72px;
			padding: 0.75rem 0;
		}

		.header__left,
		.header__right {
			display: flex;
			align-items: center;
		}

		.header__left {
			@media screen and (min-width: 768px) {
				flex: 2;
			}
		}

		.header__right {
			flex: 1;
			justify-content: flex-end;
		}

		.header__search {
			flex: 1;
			display: none;

			@media screen and (min-width: 768px) {
				display: block;
			}
		}

		.header__switch {
			min-width: 172px;
			display: none;

			@media screen and (min-width: 768px) {
				display: block;
			}
		}

		.header__nav {
			display: flex;
			margin-right: 2rem;
			gap: 2rem;

			display: none;

			@media screen and (min-width: 768px) {
				display: flex;
			}
		}

		.header__brand {
			img {
				width: 2.25rem;
				height: auto;
			}
		}

		.header__switch {
			padding-left: 0.5rem;
			margin-left: 0.5rem;
		}
	}
</style>

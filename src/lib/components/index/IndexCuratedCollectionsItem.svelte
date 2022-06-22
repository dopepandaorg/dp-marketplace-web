<script lang="ts">
	import { Button, Link } from 'carbon-components-svelte'
	import Globe from 'carbon-icons-svelte/lib/Wikis.svelte'
	import LogoDiscord from 'carbon-icons-svelte/lib/LogoDiscord.svelte'
	import LogoTwitter from 'carbon-icons-svelte/lib/LogoTwitter.svelte'
	import ArrowRight from 'carbon-icons-svelte/lib/ArrowRight.svelte'

	import AssetTile from '../common/AssetTile.svelte'

	export let title = 'Title'
	export let description =
		'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur delectus adipisci'
</script>

<div class="curated-collection-item">
	<div class="curated-collection-item__content">
		<div class="curated-collection-item__meta">
			<div class="curated-collection-item__avatar" />
			<div class="curated-collection-item__title">{title}</div>
			<div class="curated-collection-item__description">{description}</div>
		</div>

		<div class="curated-collection-item__action">
			<div class="curated-collection-item__links">
				<Link href="#"><LogoDiscord /> dopepandaorg</Link>
				<Link href="#"><LogoTwitter /> @dopepandaorg</Link>
				<Link href="#"><Globe /> https://dopepanda.org</Link>
			</div>

			<a href="/collections/sdsdsds">
				<Button kind="tertiary" icon={ArrowRight}>View Collection</Button>
			</a>
		</div>
	</div>

	<div class="curated-collection-item__assets">
		<AssetTile id={86432212} />
		<AssetTile id={87797799} />
		<AssetTile id={86432212} />
	</div>
</div>

<style lang="scss">
	.curated-collection-item {
		display: grid;
		grid-template-columns: 320px 1fr;
		padding: 2rem;
		gap: 4rem;
		margin-bottom: 4rem;
		border-radius: 0.5rem;

		min-height: 500px;

		background-color: #50a3a830;

		&__assets {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			gap: 1.5rem;
			align-items: center;
		}

		&__content {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}

		&__avatar {
			width: 4rem;
			height: 4rem;
			margin-bottom: 1.5rem;

			border-radius: 0.5rem;
		}

		&__title {
			font-size: 2.25rem;
			margin-bottom: 1rem;
		}

		&__description {
			line-height: normal;
		}

		&__links {
			display: flex;
			flex-direction: column;

			:global(a) {
				display: flex;
				align-items: center;
				margin-top: 1rem;
			}

			:global(svg) {
				width: 1.25rem;
				height: 1.25rem;
				float: left;
				margin-right: 0.5rem;
			}
		}

		&__action {
			:global(button) {
				margin-top: 2rem;
				width: 100%;
			}
		}
	}
</style>

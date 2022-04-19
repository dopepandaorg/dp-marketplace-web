<script lang="ts">
	import { Http, Launch, LogoInstagram, LogoTwitter } from 'carbon-icons-svelte'

	export let type: 'twitter' | 'instagram' | 'website'
	export let text: string

	let link
	let prefix

	if (text) {
		switch (type) {
			case 'twitter':
				link = `https://twitter.com/${text}`
				prefix = '@'
				break
			case 'instagram':
				link = `https://instagram.com/${text}`
				prefix = '@'
				break
			case 'website':
				link = text.startsWith('http') ? text : `https://${text}`
				break
		}
	}

	const visitLink = () => {
		if (link) {
			window.open(link, '_blank')
		}
	}
</script>

<div class="social-link  {!text && 'empty'}" on:click={visitLink}>
	<div class="social-link__icon">
		{#if type === 'twitter'}
			<LogoTwitter />
		{:else if type === 'instagram'}
			<LogoInstagram />
		{:else if type === 'website'}
			<Http />
		{/if}
	</div>

	<div class="social-link__text">
		{text ? (prefix ? prefix + text : text) : 'Not set'}
	</div>

	{#if link}
		<div class="social-link__action"><Launch /></div>
	{/if}
</div>

<style lang="scss">
	.social-link {
		display: flex;
		align-items: center;
		background-color: var(--dp--black-02);
		padding: 0.625rem 1rem;
		border-radius: 4px;
		transition: background-color 0.125s;

		&__icon {
			margin-right: 1.25rem;

			:global(svg) {
				width: 2.25rem;
				height: 2.25rem;
				float: left;
			}
		}

		&__text {
			flex: 1;
		}

		&.empty {
			.social-link__text {
				opacity: 0.5;
			}
		}

		&:not(.empty) {
			&:hover {
				cursor: pointer;
				background-color: var(--dp--black-03);
			}
		}
	}
</style>

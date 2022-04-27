<script lang="ts">
	import Http from 'carbon-icons-svelte/lib/Http.svelte'
	import Launch from 'carbon-icons-svelte/lib/Launch.svelte'
	import LogoInstagram from 'carbon-icons-svelte/lib/LogoInstagram.svelte'
	import LogoTwitter from 'carbon-icons-svelte/lib/LogoTwitter.svelte'

	export let type: 'twitter' | 'instagram' | 'website'
	export let text: string

	let link
	let prefix

	if (text) {
		switch (type) {
			case 'twitter':
				text = text.replaceAll('@', '')
				text = text.replace(/(http(s?)):\/\/twitter\.com\//, '')
				link = `https://twitter.com/${text}`
				prefix = '@'
				break
			case 'instagram':
				text = text.replaceAll('@', '')
				text = text.replace(/(http(s?)):\/\/instagram\.com\//, '')
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
		min-width: 0;

		&__icon {
			margin-right: 1.25rem;

			:global(svg) {
				width: 2.25rem;
				height: 2.25rem;
				float: left;
			}
		}

		&__text {
			line-height: 1.4;

			flex: 1;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		&__action {
			margin-left: 0.5rem;
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

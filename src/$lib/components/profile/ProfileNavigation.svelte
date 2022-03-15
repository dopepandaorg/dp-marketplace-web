<script lang="ts">
	import { onDestroy } from 'svelte'
	import { page } from '$app/stores'

	let path
	let basePath = '/profile'

	const pageSub = page.subscribe(({ url }) => {
		path = url.pathname
	})
	onDestroy(pageSub)

	const navigationItems = [
		{
			id: 'collections',
			label: 'Collections',
			path: `${basePath}/collections`
		},
		{
			id: 'creations',
			label: 'Creations',
			path: `${basePath}/creations`
		},
		{
			id: 'assets',
			label: 'Assets',
			path: `${basePath}/assets`
		},
		{
			id: 'activity',
			label: 'Activity',
			path: `${basePath}/activity`
		}
	]
</script>

<div class="profile-navigation">
	{#each navigationItems as item}
		<div class="profile-navigation-item {item.path === path ? 'active' : ''}">
			<a href={item.path}>{item.label}</a>
		</div>
	{/each}
</div>

<style lang="scss">
	.profile-navigation {
		display: flex;
		margin-bottom: 2rem;

		> div {
			flex: 1;
			margin-right: 4px;

			&:last-child {
				margin-right: 0;
			}
		}
	}

	.profile-navigation-item {
		position: relative;

		a {
			display: block;
			padding: 1rem;
			line-height: 1.3;
			transition: background-color 70ms;
		}

		&:after {
			content: '';
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			width: 100%;
			height: 2px;
			background-color: var(--dp--black-03);
		}

		&.active {
			background-color: var(--dp--black-03);

			&:after {
				opacity: 1;
				visibility: visible;
				background: linear-gradient(109.08deg, #fd9d5d 0%, #fd2ca0 49.53%, #3397ff 104.51%);
			}
		}

		&:hover {
			background-color: var(--dp--black-03);
		}
	}
</style>

<script lang="ts">
	import { onDestroy } from 'svelte'
	import { page } from '$app/stores'
	import { Dropdown } from 'carbon-components-svelte'
	import { goto } from '$app/navigation'

	enum PageType {
		MARKETPLACE = 'Marketplace',
		CONTESTS = 'Contest',
		MINTER = 'Minter',
		PLATFORM = 'Platform',
		LAUNCHPAD = 'Launchpad'
	}

	const pageTypes = [
		{
			id: PageType.MARKETPLACE,
			text: 'Marketplace',
			path: '/',
			allowedPaths: ['/', '/marketplace'],
			isDisabled: false
		},
		{
			id: PageType.CONTESTS,
			text: 'Contests',
			path: '/contests',
			allowedPaths: ['/contests'],
			isDisabled: false
		},
		{
			id: PageType.MINTER,
			text: 'Minter',
			path: '/create',
			allowedPaths: ['/create'],
			isDisabled: false,
			tooltip: ''
		},
		{
			id: PageType.PLATFORM,
			text: 'Platform',
			path: '/platform',
			allowedPaths: ['/platform'],
			isDisabled: true,
			tooltip: 'Coming Soon'
		},
		{
			id: PageType.LAUNCHPAD,
			text: 'Launchpad',
			path: '/launchpad',
			allowedPaths: ['/launchpad'],
			isDisabled: true,
			tooltip: 'Coming Soon'
		}
	]

	let activePage: PageType = PageType.CONTESTS

	const pageSub = page.subscribe((page) => {
		const matchedPageType = pageTypes.find(
			(pt) => pt.allowedPaths.indexOf(page.url.pathname) !== -1
		)
		if (matchedPageType) activePage = matchedPageType.id
	})

	const switchPage = (e: CustomEvent) => {
		const selectedPage = e.detail.selectedItem.path
		goto(selectedPage)
	}

	onDestroy(pageSub)
</script>

<Dropdown type="inline" selectedId={activePage} items={pageTypes} on:select={switchPage} />

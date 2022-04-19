<script context="module">
	export async function load() {
		return {
			status: 302,
			redirect: '/contests'
		}
	}
</script>

<script lang="ts">
	import IndexBanner from '$lib/components/index/IndexBanner.svelte'
	import IndexCategories from '$lib/components/index/IndexCategories.svelte'
	import IndexTrending from '$lib/components/index/IndexTrending.svelte'
	import IndexExplore from '$lib/components/index/IndexExplore.svelte'
</script>

<svelte:head>
	<title>Marketplace | DopePanda</title>
</svelte:head>

<IndexBanner />
<IndexTrending />
<IndexCategories />
<IndexExplore />

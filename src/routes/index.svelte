<script lang="ts">
	import IndexAbout from '$lib/components/index/IndexAbout.svelte'

	import IndexBanner from '$lib/components/index/IndexBanner.svelte'
	import IndexCategories from '$lib/components/index/IndexCategories.svelte'
	import IndexCuratedCollections from '$lib/components/index/IndexCuratedCollections.svelte'
	import IndexRewards from '$lib/components/index/IndexRewards.svelte'
	import IndexTrending from '$lib/components/index/IndexTrending.svelte'
</script>

<svelte:head>
	<title>Marketplace | DopePanda</title>
</svelte:head>

<IndexBanner />
<IndexTrending />
<IndexCuratedCollections />
<IndexAbout />
<IndexRewards />

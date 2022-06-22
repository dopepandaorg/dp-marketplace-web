<script lang="ts">
	import IndexBanner from '$lib/components/index/IndexBanner.svelte'
	import IndexCuratedCollections from '$lib/components/index/IndexCuratedCollections.svelte'
	import IndexTrending from '$lib/components/index/IndexTrending.svelte'
</script>

<svelte:head>
	<title>Marketplace | DopePanda</title>
</svelte:head>

<IndexBanner />
<IndexTrending />
<IndexCuratedCollections />

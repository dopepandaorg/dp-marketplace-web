<script>
	import PageHeader from '../$lib/components/common/PageHeader.svelte'

	import EmptyPage from '../$lib/components/common/EmptyPage.svelte'
</script>

<svelte:head>
	<title>Launchpad | DopePanda</title>
</svelte:head>

<PageHeader title="Launchpad" subtitle="Create and mint your digital art on Algorand" size="sm" />

<section class="section">
	<div class="container">
		<EmptyPage
			icon="/images/working-progress-icon.svg"
			title="Work in progress!"
			description="This feature is currently being developed"
		/>
	</div>
</section>

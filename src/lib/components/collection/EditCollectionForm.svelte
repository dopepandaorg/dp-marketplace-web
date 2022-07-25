<script lang="ts">
	import { Form, FormGroup, Button, TextInput, TextArea } from 'carbon-components-svelte'
	import MediaInput from '../common/MediaInput.svelte'
	import { goto } from '$app/navigation'
	import Erase from 'carbon-icons-svelte/lib/Erase.svelte'
	import { getContext } from 'svelte'
	import type { Writable } from 'svelte/store'
	import type { CollectionRecord } from '$lib/interfaces/collection'
	import EditCollectionTx from '../transactions/EditCollectionTx.svelte'

	let collectionData

	let title
	let slug
	let creator
	let description
	let pattern_prefix
	let twitter
	let discord
	let reddit
	let website
	let avatarIpfsCID
	let isAvatarIpfsCIDValid = false
	let bannerIpfsCID
	let isBannerIpfsCIDValid = false

	let isSubmitting = false
	let isPristine = false

	const resetForm = () => {
		slug = collectionData.slug
		title = collectionData.title
		creator = collectionData.creator
		description = collectionData.description
		avatarIpfsCID = collectionData.avatar_cid || ''
		bannerIpfsCID = collectionData.banner_cid || ''
		pattern_prefix = collectionData.pattern_prefix || ''

		isAvatarIpfsCIDValid = false
		isBannerIpfsCIDValid = false
	}

	const collectionQuery = getContext<Writable<CollectionRecord>>('collection-data')
	collectionQuery.subscribe((c) => {
		if (!collectionData && !!c) {
			collectionData = c
			resetForm()
		}
	})
</script>

<Form on:submit={(e) => e.preventDefault()}>
	<FormGroup>
		<TextInput
			size="xl"
			required
			labelText="Title"
			placeholder="Enter the title of your collection"
			bind:value={title}
		/>

		<TextArea
			labelText="Description"
			placeholder="Enter a short description of your collection"
			bind:value={description}
		/>
	</FormGroup>

	<hr />

	<FormGroup>
		<MediaInput
			label="Collection Avatar"
			bind:value={avatarIpfsCID}
			bind:isValid={isAvatarIpfsCIDValid}
		/>
	</FormGroup>

	<hr />

	<FormGroup>
		<MediaInput
			label="Collection Banner"
			aspectRatio="16x9"
			bind:value={bannerIpfsCID}
			bind:isValid={isBannerIpfsCIDValid}
		/>
	</FormGroup>

	<hr />

	<FormGroup>
		<TextInput
			size="xl"
			labelText="Twitter"
			placeholder="Enter your twitter handle"
			bind:value={twitter}
		/>
		<TextInput
			size="xl"
			labelText="Discord"
			placeholder="Enter your discord link"
			bind:value={discord}
		/>
		<TextInput
			size="xl"
			labelText="Reddit"
			placeholder="Enter your reddit link"
			bind:value={reddit}
		/>
		<TextInput
			size="xl"
			labelText="Website"
			placeholder="Enter your website URL"
			bind:value={website}
		/>
	</FormGroup>

	<hr />

	<div class="form-submit">
		<Button kind="secondary" on:click={resetForm} disabled={isSubmitting} icon={Erase}>
			Reset
		</Button>

		<EditCollectionTx
			id={collectionData.id}
			{title}
			{slug}
			{creator}
			{description}
			{pattern_prefix}
			{twitter}
			{discord}
			{reddit}
			{website}
			{avatarIpfsCID}
			{bannerIpfsCID}
			isValid={!isPristine}
			bind:isSubmitting
			on:complete={() => goto(`/collections/${collectionData.id}`)}
		/>
	</div>
</Form>

<style lang="scss">
	.form-submit {
		display: grid;
		justify-content: space-between;
		grid-template-columns: 1fr;
		gap: 1rem;

		@media screen and (min-width: 768px) {
			grid-template-columns: 1fr 1fr;
			gap: 4rem;
		}

		:global(.bx--btn) {
			width: 100%;
			min-height: 3.5rem;
			max-width: none;
		}
	}
</style>

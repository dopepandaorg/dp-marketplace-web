<script lang="ts">
	import { Form, FormGroup, Button, TextInput, TextArea } from 'carbon-components-svelte'
	import MediaInput from '../common/MediaInput.svelte'
	import ProfileHandleInput from './ProfileHandleInput.svelte'
	import EditProfileTx from '../transactions/EditProfileTx.svelte'
	import type { ProfileRecord } from '$lib/interfaces/profile'
	import { goto } from '$app/navigation'
	import Erase from 'carbon-icons-svelte/lib/Erase.svelte'

	export let profileData: ProfileRecord

	let name = profileData.display_name
	let handle = profileData.handle || ''
	let isHandleValid = false
	let bio = profileData.bio || ''
	let twitter = profileData.social_twitter || ''
	let instagram = profileData.social_instagram || ''
	let website = profileData.social_website || ''
	let avatarIpfsCID = profileData.avatar_cid || ''
	let isAvatarIpfsCIDValid = false
	let bannerIpfsCID = profileData.banner_cid || ''
	let isBannerIpfsCIDValid = false

	let isSubmitting = false
	let isPristine = false

	const clearForm = () => {
		name = profileData.display_name
		handle = profileData.handle || ''
		bio = profileData.bio || ''
		twitter = profileData.social_twitter || ''
		instagram = profileData.social_instagram || ''
		website = profileData.social_website || ''
		avatarIpfsCID = profileData.avatar_cid || ''
		bannerIpfsCID = profileData.banner_cid || ''
		isAvatarIpfsCIDValid = false
		isBannerIpfsCIDValid = false
	}
</script>

<Form on:submit={(e) => e.preventDefault()}>
	<FormGroup>
		<TextInput
			size="xl"
			required
			labelText="Display Name"
			placeholder="Enter a name for your profile"
			bind:value={name}
		/>

		<ProfileHandleInput
			label="URL Handle"
			placeholder="Enter a URL handle for your profile"
			bind:value={handle}
			bind:isValid={isHandleValid}
		/>

		<TextArea
			labelText="Bio"
			placeholder="Enter a short description about yourself"
			bind:value={bio}
		/>
	</FormGroup>

	<hr />

	<FormGroup>
		<MediaInput
			label="Profile Avatar"
			bind:value={avatarIpfsCID}
			bind:isValid={isAvatarIpfsCIDValid}
		/>
	</FormGroup>

	<hr />

	<FormGroup>
		<MediaInput
			label="Profile Banner"
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
			labelText="Instagram"
			placeholder="Enter your instagram handle"
			bind:value={instagram}
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
		<Button kind="secondary" on:click={clearForm} disabled={isSubmitting} icon={Erase}>
			Reset
		</Button>

		<EditProfileTx
			{name}
			{bio}
			{twitter}
			{instagram}
			{website}
			{avatarIpfsCID}
			{bannerIpfsCID}
			isValid={!isPristine}
			bind:isSubmitting
			on:complete={() => goto('/profile')}
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

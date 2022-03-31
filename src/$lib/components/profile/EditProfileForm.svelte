<script lang="ts">
	import { Form, FormGroup, Button, TextInput, TextArea } from 'carbon-components-svelte'

	import MediaInput from '../common/MediaInput.svelte'
	import { getProfile } from '../../../stores/profile'
	import ProfileHandleInput from './ProfileHandleInput.svelte'
	import EditProfileTx from '../transactions/EditProfileTx.svelte'

	let profileData = getProfile()

	let name = profileData.display_name
	let handle = profileData.handle
	let isHandleValid = false
	let bio = profileData.bio
	let twitter = profileData.twitter
	let instagram = profileData.instagram
	let website = profileData.website
	let avatarIpfsCID = profileData.avatar
	let isAvatarIpfsCIDValid = false
	let bannerIpfsCID = profileData.banner
	let isBannerIpfsCIDValid = false

	let isValid = true
	let isSubmitting = false

	const clearForm = () => {
		name = ''
		handle = ''
		isHandleValid = false
		bio = ''
		avatarIpfsCID = ''
		isAvatarIpfsCIDValid = false
		bannerIpfsCID = ''
		isBannerIpfsCIDValid = false

		isValid = false
	}

	const onUpdate = () => {
		console.log('update!!!')
		profileData = getProfile()
	}

	$: {
		// Validate form with default conditions
		const isNameValid = !!name

		// Combine all individual validations
		isValid = isNameValid
	}
</script>

<Form on:submit={(e) => e.preventDefault()}>
	<FormGroup>
		<TextInput
			size="xl"
			required
			labelText="Display Name"
			placeholder="Enter a name for your Profile"
			bind:value={name}
		/>

		<ProfileHandleInput
			label="Handle"
			placeholder="Enter a name for your Profile"
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
			bind:value={bannerIpfsCID}
			bind:isValid={isBannerIpfsCIDValid}
		/>
	</FormGroup>

	<hr />

	<FormGroup>
		<TextInput
			size="xl"
			required
			labelText="Twitter"
			placeholder="Enter a name for your Profile"
			bind:value={twitter}
		/>
		<TextInput
			size="xl"
			required
			labelText="Instagram"
			placeholder="Enter a name for your Profile"
			bind:value={instagram}
		/>
		<TextInput
			size="xl"
			required
			labelText="Website"
			placeholder="Enter a name for your Profile"
			bind:value={website}
		/>
	</FormGroup>

	<hr />

	<div class="form-submit">
		<Button kind="secondary" on:click={clearForm} disabled={isSubmitting}>Clear</Button>
		<EditProfileTx
			{isValid}
			{name}
			{bio}
			{twitter}
			{instagram}
			{website}
			{avatarIpfsCID}
			{bannerIpfsCID}
			onSubmit={onUpdate}
		/>

		<!-- <div>
			{#if isSubmitting}
				<InlineLoading status="active" description="Submitting ..." />
			{:else}
				<Button type="submit" disabled={!isValid} icon={UpdateNow16}>Update Profile</Button>
			{/if}
		</div> -->
	</div>
</Form>

<style lang="scss">
	.form-submit {
		display: flex;
		justify-content: space-between;

		> div:first-child {
			flex: 1;
			margin-right: 2rem;
		}

		> div:last-child {
			flex: 1;
			margin-left: 2rem;

			display: flex;
			align-items: center;
			justify-content: center;
		}

		:global(button) {
			width: 100%;
			min-height: 3.5rem;
		}
	}
</style>

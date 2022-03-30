<script lang="ts">
	import {
		Form,
		FormGroup,
		Button,
		TextInput,
		TextArea,
		InlineLoading
	} from 'carbon-components-svelte'

	import MediaInput from '../common/MediaInput.svelte'
	import { getProfile } from '../../../stores/profile'
	import { UpdateNow16 } from 'carbon-icons-svelte'
	import ProfileHandleInput from './ProfileHandleInput.svelte'

	const profileData = getProfile()

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

	let submit = (e: Event) => {
		e.preventDefault()

		if (isValid) {
			isSubmitting = true

			// // Build Asset Metadata
			// const metadata: AssetMetadata = {
			// 	assetName: name,
			// 	unitName: unit,
			// 	assetURL: `ipfs://${ipfsCID}`
			// }

			// buildTransactionCreateASA($wallet.type, $wallet.account, metadata, 0)
			// 	.then(() => clearForm())
			// 	.finally(() => (isSubmitting = false))
		}
	}

	$: {
		// Validate form with default conditions
		const isNameValid = !!name

		// Combine all individual validations
		isValid = isNameValid && isAvatarIpfsCIDValid && isBannerIpfsCIDValid
	}
</script>

<Form on:submit={submit}>
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
		<div>
			<Button kind="secondary" on:click={clearForm} disabled={isSubmitting}>Clear</Button>
		</div>

		<div>
			{#if isSubmitting}
				<InlineLoading status="active" description="Submitting ..." />
			{:else}
				<Button type="submit" disabled={!isValid} icon={UpdateNow16}>Update Profile</Button>
			{/if}
		</div>
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

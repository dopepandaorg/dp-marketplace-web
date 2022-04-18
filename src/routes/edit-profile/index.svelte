<script>
	import EditProfileForm from '$lib/components/profile/EditProfileForm.svelte'
	import { Q_GET_PROFILE } from '$lib/constants/queries'
	import { operationStore, query } from '@urql/svelte'
	import { wallet } from '../../stores/wallet'

	export const profile = operationStore(Q_GET_PROFILE, { wallet: $wallet.account })
	query(profile)

	let profileData
	profile.subscribe((p) => {
		if (p.data) {
			profileData = p.data.profiles_by_pk
		}
	})
</script>

<div class="edit-profile">
	<div class="container-sm">
		<h2>Edit Profile</h2>

		{#if $profile.fetching}
			Loading ...
		{:else if profileData}
			<EditProfileForm {profileData} />
		{/if}
	</div>
</div>

<style lang="scss">
	.edit-profile {
		padding-top: 2rem;

		h2 {
			margin-bottom: 2rem;
		}
	}
</style>

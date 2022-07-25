<script>
	import EditProfileForm from '$lib/components/profile/EditProfileForm.svelte'
	import { Q_GET_PROFILE } from '$lib/constants/queries'
	import { operationStore, query } from '@urql/svelte'
	import { wallet } from '$lib/stores/wallet'
	import EditCollectionForm from '$lib/components/collection/EditCollectionForm.svelte'

	// export const profile = operationStore(Q_GET_PROFILE, { wallet: $wallet.account })
	// query(profile)

	// let profileData
	// profile.subscribe((p) => {
	// 	if (p.data) {
	// 		profileData = p.data.profiles_by_pk
	// 	}
	// })
</script>

<div class="edit-collection">
	<div class="container-sm">
		<h2>Edit Collection</h2>

		<EditCollectionForm collectionData={null} />
	</div>
</div>

<style lang="scss">
	.edit-collection {
		padding-top: 2rem;

		h2 {
			margin-bottom: 2rem;
		}
	}
</style>

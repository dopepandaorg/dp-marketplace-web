<script lang="ts">
	import { Button, InlineLoading, Modal } from 'carbon-components-svelte'
	import UpdateNow from 'carbon-icons-svelte/lib/UpdateNow.svelte'
	import { wallet } from '$lib/stores/wallet'
	import type { Transaction } from 'algosdk'
	import { SignedTxn, WalletType } from '$lib/interfaces/wallet'
	import { signTransaction, submitTransaction } from '$lib/transaction-builder/common'
	import { onClearPera } from '$lib/helper/walletConnect'
	import { mutation } from '@urql/svelte'
	import { Q_SYNC_COLLECTION } from '$lib/constants/queries'
	import TxStep from './TxStep.svelte'
	import { LoadingStatus } from '$lib/constants/enums'
	import { createEventDispatcher } from 'svelte'
	import { isMobile, triggerWalletDeeplink } from '$lib/helper/utils'
	import { buildTransactionCollectionEdit } from '$lib/transaction-builder/collection'

	const updateDBMutation = mutation({ query: Q_SYNC_COLLECTION })
	let dispatch = createEventDispatcher()

	export let id
	export let title
	export let slug
	export let creator
	export let description
	export let pattern_prefix
	export let twitter = ''
	export let discord = ''
	export let reddit = ''
	export let website = ''
	export let avatarIpfsCID = ''
	export let bannerIpfsCID = ''
	export let isValid = false
	export let isComplete = false
	export let isSubmitting = false

	let open = false
	let walletType = $wallet.type
	let walletAccount = $wallet.account

	let txn: Transaction
	let isTxnLoading: boolean

	let signedTxn: SignedTxn
	let isSignedTxnLoading: boolean

	let txId: string
	let confirmedRound: number

	let isUpdateDBLoading: boolean

	let confirmModal = () => {
		open = true
		isTxnLoading = true
		walletType = $wallet.type

		buildTransactionCollectionEdit(
			walletAccount,
			id,
			title,
			slug,
			creator,
			description,
			pattern_prefix,
			avatarIpfsCID,
			bannerIpfsCID,
			twitter,
			discord,
			reddit,
			website
		)
			.then((response) => (txn = response))
			.catch(() => (txn = null))
			.finally(() => (isTxnLoading = false))
	}

	const sign = () => {
		if (txn) {
			isSignedTxnLoading = true

			triggerWalletDeeplink()
			signTransaction(walletType, txn, 'Update collection on DopePanda')
				.then((response) => {
					signedTxn = response
					submit()
				})
				.catch(() => (signedTxn = null))
				.finally(() => (isSignedTxnLoading = false))
		}
	}

	const submit = () => {
		if (signedTxn) {
			isSubmitting = true
			submitTransaction(signedTxn)
				.then((response) => {
					txId = response.txId
					confirmedRound = response.confirmedRound
					isUpdateDBLoading = true

					updateDB()
				})
				.catch(() => {
					txId = null
					confirmedRound = null
				})
				.finally(() => (isSubmitting = false))
		}
	}

	const updateDB = () => {
		if (txId && confirmedRound) {
			updateDBMutation({ txId, wallet: walletAccount })
				.then(() => {
					isComplete = true
					clear()

					setTimeout(() => {
						complete()
					}, 100)
				})
				.finally(() => (isUpdateDBLoading = false))
		}
	}

	const complete = () => {
		dispatch('complete')
	}

	const clear = () => {
		open = false
		txn = null
		signedTxn = null
		txId = null
		confirmedRound = null
		isUpdateDBLoading = false
		isSubmitting = false
		isTxnLoading = false
		isSignedTxnLoading = false
		isSubmitting = false

		if (walletType === WalletType.PERA) {
			onClearPera()
		}
	}

	const close = () => {
		clear()
	}
</script>

<div class="tx-modal tx-modal--edit-collection">
	<div class="tx-modal__action">
		<Button
			on:click={confirmModal}
			type="button"
			disabled={!isValid || open}
			icon={isSubmitting ? InlineLoading : UpdateNow}>Update Collection</Button
		>
	</div>

	<Modal
		bind:open
		preventCloseOnClickOutside
		modalHeading="Edit Collection"
		modalLabel={walletType && walletType.toUpperCase()}
		primaryButtonText="Sign Transaction"
		secondaryButtonText="Cancel"
		primaryButtonDisabled={isTxnLoading || isSignedTxnLoading}
		passiveModal={!!signedTxn}
		on:click:button--secondary={() => close()}
		on:open
		on:close={close}
		on:submit={sign}
	>
		<div class="tx-modal__inner">
			<div class="tx-modal__steps">
				<TxStep
					stepCount={1}
					status={isTxnLoading
						? LoadingStatus.IN_PROGRESS
						: txn
						? LoadingStatus.SUCCESS
						: LoadingStatus.NONE}
					label="Build Transaction"
					descriptionPending="Building your transaction ..."
					descriptionSuccess="Transaction ready, sign with your wallet."
				/>
				<TxStep
					stepCount={2}
					label="Sign transaction"
					status={isSignedTxnLoading
						? LoadingStatus.IN_PROGRESS
						: signedTxn
						? LoadingStatus.SUCCESS
						: LoadingStatus.NONE}
					descriptionPending="Waiting for signature ..."
					descriptionSuccess="Signature complete"
				/>
				<TxStep
					stepCount={3}
					status={isSubmitting
						? LoadingStatus.IN_PROGRESS
						: txId && confirmedRound
						? LoadingStatus.SUCCESS
						: LoadingStatus.NONE}
					label="Submit transaction"
					descriptionPending="Submitting transaction on Algorand ..."
					descriptionSuccess="Transaction submitted"
				/>
				<TxStep
					stepCount={4}
					status={isUpdateDBLoading
						? LoadingStatus.IN_PROGRESS
						: txId && confirmedRound
						? LoadingStatus.SUCCESS
						: LoadingStatus.NONE}
					label="Update Index"
					descriptionPending="Updating indexes ..."
					descriptionSuccess="Complete"
				/>
			</div>
			<div class="tx-modal__graphic">
				<img src="/images/edit-profile-graphic.svg" alt="" />
			</div>
		</div>
	</Modal>
</div>

<style lang="scss">
	.tx-modal--edit-collection {
		.tx-modal__action {
			:global(.bx--btn) {
				width: 100%;
				max-width: none;
				padding: 1rem;
			}
		}

		:global(.bx--modal-container) {
			min-height: 400px;
		}

		:global(.bx--modal button) {
			border-radius: 0;
		}
	}

	.tx-modal__inner {
		display: flex;
		align-items: center;
		flex-direction: column-reverse;
		width: 100%;

		@media screen and (min-width: 768px) {
			flex-direction: row;
		}
	}

	.tx-modal__steps {
		flex: 1;
		margin-top: 2rem;
		width: 100%;
	}

	.tx-modal__graphic {
		img {
			width: 120px;
			height: 120px;
		}

		@media screen and (min-width: 768px) {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;

			img {
				width: 200px;
				height: 200px;
			}
		}
	}
</style>

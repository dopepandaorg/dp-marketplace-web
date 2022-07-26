<script lang="ts">
	import { Button, InlineLoading, Modal, NumberInput, Slider } from 'carbon-components-svelte'
	import { wallet } from '$lib/stores/wallet'
	import type { Transaction } from 'algosdk'
	import { SignedTxn, WalletType } from '$lib/interfaces/wallet'
	import { signTransaction, submitTransaction } from '$lib/transaction-builder/common'
	import { onClearPera } from '$lib/helper/walletConnect'
	import TxStep from './TxStep.svelte'
	import { LoadingStatus } from '$lib/constants/enums'
	import { deleteAppEscrowListing } from '$lib/transaction-builder/escrowListing'
	import { triggerWalletDeeplink } from '$lib/helper/utils'
	import { mutation } from '@urql/svelte'
	import { createEventDispatcher } from 'svelte'
	import { Q_REMOVE_ESCROW_LISTING } from '$lib/constants/queries'

	const dispatch = createEventDispatcher()
	const updateDBMutation = mutation({ query: Q_REMOVE_ESCROW_LISTING })

	export let id: string
	export let appId: number
	export let assetId: number
	export let isComplete = false

	let isSubmitting = false

	export let open = false
	let walletType = $wallet.type
	let walletAccount = $wallet.account

	let txn: Transaction
	let isTxnLoading: boolean

	let signedTxn: SignedTxn
	let isSignedTxnLoading: boolean

	let txId: string
	let confirmedRound: number

	let isUpdateDBLoading: boolean

	const clear = () => {
		open = false
		isSubmitting = false

		txn = null
		signedTxn = null

		isTxnLoading = false
		isSignedTxnLoading = false

		txId = null
		confirmedRound = null

		isUpdateDBLoading = false

		if (walletType === WalletType.PERA) {
			onClearPera()
		}
	}

	const close = () => {
		clear()
	}

	/**
	 * Load up the transaction modal
	 *
	 *
	 */
	const confirmModal = (e: Event) => {
		e.stopPropagation()

		open = true
		setupTransaction()
	}

	/**
	 * Step 1. Application setup transaction is created
	 *
	 */
	const setupTransaction = () => {
		if (appId) {
			isTxnLoading = true

			deleteAppEscrowListing(walletAccount, walletAccount, appId, assetId)
				.then((response) => (txn = response))
				.catch(() => (txn = null))
				.finally(() => (isTxnLoading = false))
		}
	}

	/**
	 * Step 5. User requests the signing of application setup transaction
	 *
	 */
	const signTx = () => {
		if (txn) {
			isSignedTxnLoading = true
			triggerWalletDeeplink()

			signTransaction(walletType, txn, 'Remove Escrow Listing on DopePanda')
				.then((response) => {
					signedTxn = response
					submitTx()
				})
				.catch(() => (signedTxn = null))
				.finally(() => (isSignedTxnLoading = false))
		}
	}

	/**
	 * Step 6. Setup application transaction is submitted on the blockchain
	 *
	 */
	const submitTx = () => {
		if (signedTxn) {
			isSubmitting = true

			submitTransaction(signedTxn)
				.then((response) => {
					txId = response.txId
					confirmedRound = response.confirmedRound
					isUpdateDBLoading = true

					updateDB()
				})
				.catch((error) => {
					txId = null
					confirmedRound = null
					console.log('error in submitting transaction', error)
				})
				.finally(() => (isSubmitting = false))
		}
	}

	/**
	 * Step 7. Listing with the transaction is updated on Hasura
	 *
	 */
	const updateDB = () => {
		isComplete = true

		if (txId && confirmedRound) {
			updateDBMutation({ id, assetId, appId, txId, wallet: walletAccount })
				.then((result) => {
					isComplete = true
					clear()

					dispatch('submitTx', {
						txId,
						confirmedRound
					})

					if (result.data && result.data.RemoveEscrowListingWithTx) {
						dispatch('remove', {
							...result.data.RemoveEscrowListingWithTx
						})
					}
				})
				.finally(() => (isUpdateDBLoading = false))
		}
	}
</script>

<div class="tx-modal tx-modal--remove-escrow">
	<div class="tx-modal__action">
		<Button
			on:click={confirmModal}
			type="button"
			kind="danger-tertiary"
			disabled={open}
			icon={isSubmitting && InlineLoading}>Remove Listing</Button
		>
	</div>

	<Modal
		bind:open
		preventCloseOnClickOutside
		modalHeading="Remove Listing"
		modalLabel={walletType && walletType.toUpperCase()}
		primaryButtonText={'Sign Transaction'}
		secondaryButtonText={'Cancel'}
		primaryButtonDisabled={isTxnLoading || isSignedTxnLoading}
		passiveModal={!!signedTxn}
		on:click:button--secondary={() => {
			open = false
		}}
		on:open
		on:close={close}
		on:submit={signTx}
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
				<img src="/images/remove-listing-graphic.svg" alt="" />
			</div>
		</div>
	</Modal>
</div>

<style lang="scss">
	.tx-modal--remove-escrow {
		.tx-modal__input {
			max-width: 520px;

			p {
				margin-bottom: 2rem;
			}

			:global(.bx--label) {
				font-size: 0.875rem;
				margin-bottom: 0.5rem;
			}

			hr {
				margin-top: -1rem;
				margin-bottom: 1.5rem;
			}

			:global(.bx--content-switcher) {
				margin-bottom: 1rem;
			}
		}

		.tx-modal__action {
			:global(.bx--btn) {
				width: 100%;
				max-width: none;
				justify-content: center;
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

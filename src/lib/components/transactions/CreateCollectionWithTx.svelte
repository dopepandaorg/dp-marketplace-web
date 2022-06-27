<script lang="ts">
	import type { Transaction } from 'algosdk'
	import { mutation } from '@urql/svelte'
	import { Button, InlineLoading, Modal, TextArea, TextInput } from 'carbon-components-svelte'
	import { wallet } from '$lib/stores/wallet'
	import { SignedTxn, WalletType } from '$lib/interfaces/wallet'
	import { signTransaction, submitTransaction } from '$lib/transaction-builder/common'
	import { onClearPera } from '$lib/helper/walletConnect'

	import { Q_CREATE_COLLECTION } from '$lib/constants/queries'
	import { LoadingStatus } from '$lib/constants/enums'
	import { triggerWalletDeeplink } from '$lib/helper/utils'
	import TxStep from './TxStep.svelte'
	import { createEventDispatcher } from 'svelte'
	import CollectionPrefixInput from '../common/CollectionPrefixInput.svelte'
	import { buildTransactionCreateCollection } from '$lib/transaction-builder/collection'
	import Add from 'carbon-icons-svelte/lib/Add.svelte'

	const dispatch = createEventDispatcher()
	const updateDBMutation = mutation({ query: Q_CREATE_COLLECTION })

	export let isComplete = false
	export let isSubmitting = false

	let view: 'input' | 'submit' = 'input'
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

	let isValid: boolean = false
	let title: string
	let description: string
	let prefix: string

	let confirmModal = () => {
		open = true
	}

	const proceedModal = () => {
		view = 'submit'

		walletType = $wallet.type
		isTxnLoading = true

		buildTransactionCreateCollection(walletAccount, prefix, title, description)
			.then((response) => (txn = response))
			.catch(() => (txn = null))
			.finally(() => (isTxnLoading = false))
	}

	const sign = () => {
		if (txn) {
			isSignedTxnLoading = true

			triggerWalletDeeplink()
			signTransaction(walletType, txn, 'Create collection with DopePanda')
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
				.catch((error) => {
					txId = null
					confirmedRound = null
					console.log('error in submitting transaction', error)
				})
				.finally(() => (isSubmitting = false))
		}
	}

	const updateDB = () => {
		if (txId && confirmedRound) {
			updateDBMutation({ txId, wallet: walletAccount })
				.then((result) => {
					isComplete = true
					clear()

					dispatch('submitTx', {
						txId,
						confirmedRound
					})

					if (result.data && result.data.CreateCollectionWithTx) {
						dispatch('create', {
							...result.data.CreateCollectionWithTx
						})
					}
				})
				.finally(() => (isUpdateDBLoading = false))
		}
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
		view = 'input'
		clear()
	}

	$: {
		isValid = !!title && !!prefix
	}
</script>

<div class="tx-modal tx-modal--create-collection">
	<div class="tx-modal__action">
		<Button
			on:click={confirmModal}
			type="button"
			kind="tertiary"
			disabled={open}
			icon={isSubmitting ? InlineLoading : Add}>Create Collection</Button
		>
	</div>

	<Modal
		bind:open
		preventCloseOnClickOutside
		modalHeading="Create Collection"
		modalLabel={walletType && walletType.toUpperCase()}
		primaryButtonText={view === 'input' ? 'Continue' : 'Sign Transaction'}
		secondaryButtonText={view === 'input' ? 'Cancel' : 'Back'}
		primaryButtonDisabled={view === 'input' ? !isValid : false}
		passiveModal={!!signedTxn}
		on:click:button--secondary={() => {
			if (view === 'submit') view = 'input'
			else open = false
		}}
		on:open
		on:close={close}
		on:submit={view === 'input'
			? () => {
					proceedModal()
			  }
			: sign}
	>
		<div class="tx-modal__inner">
			{#if view === 'input'}
				<div class="tx-modal__input">
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit explicabo accusamus temporibus
						eos esse amet obcaecati id reiciendis.
					</p>
					<TextInput
						bind:value={title}
						labelText="Title"
						placeholder="Enter your collection title"
						required
					/>
					<TextArea
						bind:value={description}
						labelText="Description"
						placeholder="Enter your collection description"
					/>

					<hr />

					<CollectionPrefixInput bind:value={prefix} />
				</div>
			{:else}
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
					<img src="/images/create-listing-graphic.svg" alt="" />
				</div>
			{/if}
		</div>
	</Modal>
</div>

<style lang="scss">
	.tx-modal--create-collection {
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
			.submitted-success {
				display: flex;
				min-height: 52px;
				align-items: center;
				justify-content: center;
				border-radius: 5px;
				background-color: var(--dp--black-02);

				:global(.bx--inline-loading) {
					justify-content: center;
				}
			}
		}

		:global(.bx--modal-container) {
			min-height: 400px;
		}

		:global(.bx--modal-footer button) {
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

	.tier-warn {
		font-size: 0.75rem;
		font-style: italic;
		line-height: 1.5;
		display: block;
		padding-top: 1rem;
		text-align: center;
	}
</style>

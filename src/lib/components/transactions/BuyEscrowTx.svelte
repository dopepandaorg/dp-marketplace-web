<script lang="ts">
	import { Button, InlineLoading, Modal } from 'carbon-components-svelte'
	import { wallet } from '$lib/stores/wallet'
	import type { Transaction } from 'algosdk'
	import { SignedTxn, WalletType } from '$lib/interfaces/wallet'
	import { signTransactions, submitTransaction } from '$lib/transaction-builder/common'
	import { onClearPera } from '$lib/helper/walletConnect'
	import { explorerUrl, triggerWalletDeeplink } from '$lib/helper/utils'
	import { buildTransactionBuyEscrow } from '$lib/transaction-builder/buyEscrow'
	import TxStep from './TxStep.svelte'
	import { LoadingStatus } from '$lib/constants/enums'
	import { mutation } from '@urql/svelte'
	import { Q_UPDATE_ESCROW_LISTING } from '$lib/constants/queries'
	import { createEventDispatcher } from 'svelte'
	import Launch from 'carbon-icons-svelte/lib/Launch.svelte'
	import { goto } from '$app/navigation'

	const dispatch = createEventDispatcher()
	const updateDBMutation = mutation({ query: Q_UPDATE_ESCROW_LISTING })

	export let escrowId
	export let assetId
	export let applicationId
	export let unitPrice
	export let creator

	export let isComplete = false
	export let isSubmitting = false

	let qty = 1

	export let open = false
	let walletType = $wallet.type
	let walletAccount = $wallet.account

	let txns: Transaction[]
	let isTxnLoading: boolean

	let signedTxns: SignedTxn[]
	let isSignedTxnLoading: boolean

	let txId: string
	let confirmedRound: number

	let isUpdateDBLoading: boolean

	let confirmModal = () => {
		open = true
		isTxnLoading = true
		walletType = $wallet.type

		buildTransactionBuyEscrow(
			walletAccount,
			creator,
			applicationId,
			assetId,
			unitPrice * qty,
			qty
		)
			.then((response) => (txns = response))
			.catch(() => (txns = null))
			.finally(() => (isTxnLoading = false))
	}

	const sign = () => {
		if (txns) {
			isSignedTxnLoading = true
			signTransactions(walletType, txns, 'Buy Asset')
				.then((response) => {
					signedTxns = response
					submit()
				})
				.catch(() => (signedTxns = null))
				.finally(() => (isSignedTxnLoading = false))
		}
	}

	const submit = () => {
		if (signedTxns) {
			isSubmitting = true

			submitTransaction(signedTxns)
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
		if (txId && confirmedRound && escrowId) {
			updateDBMutation({ txId, wallet: walletAccount, escrowId })
				.then((result) => {
					isComplete = true

					dispatch('submitTx', {
						txId,
						confirmedRound
					})

					if (result.data && result.data.UpdateEscrowListingWithTx) {
						dispatch('buy', {
							...result.data.UpdateEscrowListingWithTx
						})
					}
				})
				.finally(() => (isUpdateDBLoading = false))
		}
	}

	const clear = () => {
		open = false
		txns = null
		signedTxns = null
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

	const goToAsset = () => {
		if (assetId) {
			goto(`/assets/${assetId}`)
			clear()
		}
	}
</script>

<div class="tx-modal tx-modal--buy-escrow">
	<div class="tx-modal__action">
		<Button
			on:click={confirmModal}
			type="button"
			disabled={open}
			icon={isSubmitting && InlineLoading}>Buy Now</Button
		>
	</div>

	<Modal
		bind:open
		preventCloseOnClickOutside
		modalHeading="Buy Now"
		modalLabel={walletType && walletType.toUpperCase()}
		primaryButtonText="Sign Transaction"
		secondaryButtonText="Cancel"
		primaryButtonDisabled={isTxnLoading || isSignedTxnLoading}
		passiveModal={!!signedTxns}
		on:click:button--secondary={() => (open = false)}
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
						: txns
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
						: signedTxns
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
				{#if txId && confirmedRound}
					<img src="/images/success-graphic.svg" alt="" />
					<p>Asset successfully purchased!</p>
					<Button size="field" kind="secondary" on:click={goToAsset}>Go to Asset</Button>
					<a href={explorerUrl('algo', `/tx/${txId}`)}>View in Explorer &nbsp; <Launch /></a>
				{:else}
					<img src="/images/buy-graphic.svg" alt="" />
				{/if}
			</div>
		</div>
	</Modal>
</div>

<style lang="scss">
	.tx-modal--buy-escrow {
		.tx-modal__action {
			:global(.bx--btn) {
				width: 100%;
				max-width: none;
				justify-content: center;
				padding: 1rem;
			}

			.voted-success {
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
		display: flex;
		justify-content: center;
		flex-direction: column;
		text-align: center;
		
		p {
			color: var(--dp--text-05);
			padding-right: 0;
		}

		img {
			width: 110px;
			height: 110px;
			margin-bottom: 1rem;
		}

		a {
			font-size: 0.75rem;
			display: flex;
			align-items: center;
		}

		:global(.bx--btn) {
			min-height: 0 !important;
			width: auto !important;
			padding: 0.75rem 2rem;
			margin-bottom: 1rem;
		}

		@media screen and (min-width: 768px) {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;

			img {
				width: 150px;
				height: 150px;
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

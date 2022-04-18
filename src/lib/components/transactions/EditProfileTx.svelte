<script lang="ts">
	import { Button, InlineLoading, Modal } from 'carbon-components-svelte'
	import { wallet } from '../../../stores/wallet'
	import type { Transaction } from 'algosdk'
	import { SignedTxn, WalletType } from '$lib/interfaces/wallet'
	import { signTransaction, submitTransaction } from '$lib/transaction-builder/common'
	import { onClearPera } from '$lib/helper/walletConnect'
	import { buildTransactionProfileEdit } from '$lib/transaction-builder/profile'
	import { UpdateNow } from 'carbon-icons-svelte'
	import { mutation } from '@urql/svelte'
	import { Q_SYNC_PROFILE } from '$lib/constants/queries'

	const updateDBMutation = mutation({ query: Q_SYNC_PROFILE })

	export let isValid
	export let name
	export let bio
	export const twitter = ''
	export const instagam = ''
	export const website = ''
	export const avatarIpfsCID = ''
	export const bannerIpfsCID = ''
	export let isComplete = false
	export let isSubmitting = false
	export let onSubmit: () => void

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

		buildTransactionProfileEdit(walletAccount, name, bio)
			.then((response) => (txn = response))
			.catch(() => (txn = null))
			.finally(() => (isTxnLoading = false))
	}

	const sign = () => {
		if (txn) {
			isSignedTxnLoading = true
			signTransaction(walletType, txn, 'Update profile on DopePanda')
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
					onSubmit()
					close()
				})
				.finally(() => (isUpdateDBLoading = false))
		}
	}

	const close = () => {
		open = false
		isSubmitting = false

		if (walletType === WalletType.PERA) {
			isTxnLoading = false
			isSignedTxnLoading = false
			isSubmitting = false
			onClearPera()
		}
	}
</script>

<div class="tx-modal tx-modal--contest-vote">
	<div class="tx-modal__action">
		<Button
			on:click={confirmModal}
			type="button"
			disabled={open}
			icon={isSubmitting ? InlineLoading : UpdateNow}>Update Profile</Button
		>
	</div>

	<Modal
		bind:open
		preventCloseOnClickOutside
		modalHeading="Sign Transaction"
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
		{#if isTxnLoading}
			<InlineLoading status="active" description="Creating Transaction ..." />
		{:else if txn}
			<InlineLoading status="finished" description="Transaction Ready" />
		{/if}

		{#if isSignedTxnLoading}
			<InlineLoading status="active" description="Waiting for Signature ..." />
		{:else if signedTxn}
			<InlineLoading status="finished" description="Signature Complete" />
		{/if}

		{#if isSubmitting}
			<InlineLoading status="active" description="Submitting Transaction ..." />
		{:else if txId && confirmedRound}
			<InlineLoading status="finished" description="Transaction Submitted" />

			<div>
				TxID: {txId}
				<br />
				Current Round: {confirmedRound}
			</div>
		{/if}

		{#if isUpdateDBLoading}
			<InlineLoading status="active" description="Updating indexes ..." />
		{:else if txId && confirmedRound && isComplete}
			<InlineLoading status="finished" description="Index Updated" />
		{/if}
	</Modal>
</div>

<style lang="scss">
	.tx-modal--contest-vote {
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
</style>

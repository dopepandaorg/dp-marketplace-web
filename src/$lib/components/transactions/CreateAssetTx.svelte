<script lang="ts">
	import { Button, InlineLoading, Modal } from 'carbon-components-svelte'
	import { ArrowRight16 } from 'carbon-icons-svelte'
	import {
		buildTransactionCreateASA,
		signTransactionCreateASA,
		submitTransactionCreateASA
	} from '../../../$lib/transaction-builder/createAsset'
	import type { AssetMetadata } from '../../../$lib/interfaces/asset'
	import { wallet } from '../../../stores/wallet'
	import type { Transaction } from 'algosdk'
	import { SignedTxn, WalletType } from '../../../$lib/interfaces/wallet'
	import { onClearPera } from '../../../$lib/helper/walletConnect'

	export let name: string
	export let unit: string
	export let ipfsCID: string
	export let isSensitive: boolean
	export let isValid: boolean
	export let isSubmitting = false
	export let isComplete = false
	export let onClear: () => void

	let open = false
	let walletType = $wallet.type
	let walletAccount = $wallet.account

	let txn: Transaction
	let isTxnLoading: boolean

	let signedTxn: SignedTxn
	let isSignedTxnLoading: boolean

	let txId: string
	let confirmedRound: number

	let confirmModal = () => {
		if (isValid) {
			open = true
			isTxnLoading = true
			walletType = $wallet.type

			// Build Asset Metadata
			const metadata: AssetMetadata = {
				assetName: name,
				unitName: unit,
				assetURL: !ipfsCID.startsWith('ipfs://') ? `ipfs://${ipfsCID}` : ipfsCID,
				isSensitive
			}

			buildTransactionCreateASA(walletType, walletAccount, metadata, 0)
				.then((response) => (txn = response))
				.catch(() => (txn = null))
				.finally(() => (isTxnLoading = false))
		}
	}

	const sign = () => {
		if (isValid && txn) {
			isSignedTxnLoading = true

			signTransactionCreateASA(walletType, txn)
				.then((response) => {
					signedTxn = response
					submit()
				})
				.catch(() => (signedTxn = null))
				.finally(() => (isSignedTxnLoading = false))
		}
	}

	const submit = () => {
		if (isValid && signedTxn) {
			isSubmitting = true

			submitTransactionCreateASA(signedTxn)
				.then((response) => {
					txId = response.txId
					confirmedRound = response.confirmedRound
					isComplete = true
					onClear()
				})
				.catch(() => {
					txId = null
					confirmedRound = null
				})
				.finally(() => (isSubmitting = false))
		}
	}

	const close = () => {
		isSubmitting = false

		if (walletType === WalletType.PERA) {
			isTxnLoading = false
			isSignedTxnLoading = false
			isSubmitting = false

			onClearPera()
		}
	}
</script>

<div class="tx-modal tx-modal--create-asset">
	<Button
		on:click={confirmModal}
		type="button"
		disabled={!isValid || open}
		icon={isSubmitting ? InlineLoading : ArrowRight16}>Create</Button
	>
</div>

<Modal
	bind:open
	preventCloseOnClickOutside
	modalHeading="Sign Transaction"
	modalLabel={walletType.toUpperCase()}
	primaryButtonText="Sign Transaction"
	secondaryButtonText="Cancel"
	primaryButtonDisabled={isTxnLoading || isSignedTxnLoading}
	passiveModal={!!signedTxn}
	on:click:button--secondary={() => (open = false)}
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
</Modal>

<style lang="scss">
	:global(.bx--modal-container) {
		min-height: 400px;
	}

	:global(.bx--modal button) {
		border-radius: 0;
	}
</style>

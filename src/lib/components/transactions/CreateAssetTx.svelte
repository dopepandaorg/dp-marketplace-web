<script lang="ts">
	import { Button, InlineLoading, Modal } from 'carbon-components-svelte'
	import Launch from 'carbon-icons-svelte/lib/Launch.svelte'
	import ArrowRight from 'carbon-icons-svelte/lib/ArrowRight.svelte'
	import { buildTransactionCreateASA } from '$lib/transaction-builder/createAsset'
	import { signTransaction, submitTransaction } from '$lib/transaction-builder/common'

	import type { AssetAttribute, AssetData, AssetMetadata } from '$lib/interfaces/asset'
	import { syncWalletAssets, wallet } from '$lib/stores/wallet'
	import type { Transaction } from 'algosdk'
	import { SignedTxn, WalletType } from '$lib/interfaces/wallet'
	import { onClearPera } from '$lib/helper/walletConnect'

	import TxStep from './TxStep.svelte'
	import { AssetMetadataStandard, LoadingStatus } from '$lib/constants/enums'
	import { explorerUrl, triggerWalletDeeplink } from '$lib/helper/utils'
	import { goto } from '$app/navigation'

	export let name: string
	export let unit: string
	export let description: string
	export let ipfsCID: string
	export let ipfsMimeType: string
	export let metadataStandard: AssetMetadataStandard
	export let metadataAttributes: AssetAttribute[]
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
	let assetId: number

	let confirmModal = () => {
		if (isValid) {
			open = true
			isTxnLoading = true
			walletType = $wallet.type

			let assetURL = ipfsCID

			if (!ipfsCID.startsWith('ipfs://')) {
				assetURL = `ipfs://${ipfsCID}`
			}

			if (!assetURL.endsWith('#i') || !assetURL.endsWith('#v')) {
				assetURL = `${assetURL}#i`
			}

			// Build Asset Metadata
			const data: AssetData = {
				assetName: name,
				unitName: unit,
				description,
				mimeType: ipfsMimeType,
				assetURL,
				metadataStandard,
				metadataAttributes,
				isSensitive
			}

			buildTransactionCreateASA(walletAccount, data, 0)
				.then((response) => (txn = response))
				.catch(() => (txn = null))
				.finally(() => (isTxnLoading = false))
		}
	}

	const sign = () => {
		if (isValid && txn) {
			isSignedTxnLoading = true

			triggerWalletDeeplink()
			signTransaction(walletType, txn, 'Create asset with Minter')
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

			submitTransaction(signedTxn)
				.then((response) => {
					txId = response.txId
					confirmedRound = response.confirmedRound
					assetId = response.txInfo['asset-index']
					isComplete = true

					syncWalletAssets()
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
		txn = null
		isTxnLoading = null

		signedTxn = null
		isSignedTxnLoading = null

		txId = null
		confirmedRound = null
		assetId = null
		isSubmitting = false

		if (walletType === WalletType.PERA) {
			onClearPera()
		}
	}

	const goToAsset = () => {
		if (assetId) {
			goto(`/assets/${assetId}`)
		}
	}
</script>

<div class="tx-modal tx-modal--create-asset">
	<Button
		on:click={confirmModal}
		type="button"
		disabled={!isValid || open}
		icon={isSubmitting ? InlineLoading : ArrowRight}>Create</Button
	>

	<Modal
		bind:open
		preventCloseOnClickOutside
		modalHeading="Create Asset"
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
			</div>
			<div class="tx-modal__graphic">
				{#if txId && confirmedRound}
					<img src="/images/success-graphic.svg" alt="" />
					<p>Asset successfully minted with ID: {assetId}</p>
					<Button size="field" kind="secondary" on:click={goToAsset}>Go to Asset</Button>
					<a href={explorerUrl('algo', `/tx/${txId}`)}>View in Explorer &nbsp; <Launch /></a>
				{:else}
					<img src="/images/mint-graphic.svg" alt="" />
				{/if}
			</div>
		</div>
	</Modal>
</div>

<style lang="scss">
	.tx-modal--create-asset {
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

		:global(.bx--modal .bx--modal-footer button) {
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
</style>

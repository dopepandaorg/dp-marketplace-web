<script lang="ts">
	import { Button, InlineLoading, Modal } from 'carbon-components-svelte'
	import { wallet } from '$lib/stores/wallet'
	import type { Transaction } from 'algosdk'
	import { SignedTxn, WalletType } from '$lib/interfaces/wallet'
	import { signTransaction, submitTransaction } from '$lib/transaction-builder/common'
	import { onClearPera } from '$lib/helper/walletConnect'
	import { buildTransactionContestVote } from '$lib/transaction-builder/contest'
	import { mutation, operationStore, subscription } from '@urql/svelte'
	import { Q_CAST_VOTE, Q_SUB_DID_CONTEST_ENTRY_VOTE } from '$lib/constants/queries'
	import TxStep from './TxStep.svelte'
	import { LoadingStatus } from '$lib/constants/enums'
	import { triggerWalletDeeplink } from '$lib/helper/utils'

	const updateDBMutation = mutation({ query: Q_CAST_VOTE })

	export let contestId
	export let assetId
	export let isComplete = false
	export let isSubmitting = false
	export let isVoted: boolean = null

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

		buildTransactionContestVote(walletAccount, contestId, assetId)
			.then((response) => (txn = response))
			.catch(() => (txn = null))
			.finally(() => (isTxnLoading = false))
	}

	const sign = () => {
		if (txn) {
			isSignedTxnLoading = true

			triggerWalletDeeplink()
			signTransaction(walletType, txn, 'Submit vote on DopePanda')
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
			updateDBMutation({ txId, wallet: walletAccount, contestId })
				.then(() => {
					isComplete = true
					clear()
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
		clear()
	}

	const contestVote = operationStore(Q_SUB_DID_CONTEST_ENTRY_VOTE, {
		contest_id: contestId,
		asset_id: String(assetId),
		voter: walletAccount
	})

	subscription(contestVote).subscribe((cv) => {
		if (cv.data && cv.data.contest_entries_votes) {
			isVoted = cv.data.contest_entries_votes.length > 0
		}
	})
</script>

<div class="tx-modal tx-modal--contest-vote">
	<div class="tx-modal__action">
		{#if isVoted}
			<div class="voted-success">
				<InlineLoading status="finished" description="Voted!" />
			</div>
		{:else}
			<Button
				on:click={confirmModal}
				type="button"
				disabled={open || isVoted === null || $wallet.dpandaTier < 1}
				icon={isSubmitting && InlineLoading}>Vote</Button
			>

			{#if $wallet.dpandaTier < 1}
				<span class="tier-warn">
					You need atleast 1,000 DPANDA tokens to vote.
					<br />
					<a
						href="https://app.tinyman.org/#/swap?asset_in=0&asset_out=391379500"
						target="_blank"
						rel="noopener noreferrer">Get DPANDA on Tinyman</a
					>
				</span>
			{/if}
		{/if}
	</div>

	<Modal
		bind:open
		preventCloseOnClickOutside
		modalHeading="Cast Your Vote"
		modalLabel={walletType && walletType.toUpperCase()}
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
				<img src="/images/vote-graphic.svg" alt="" />
			</div>
		</div>
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

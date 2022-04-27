<script lang="ts">
	import { Button, InlineLoading, Modal } from 'carbon-components-svelte'
	import { wallet } from '$lib/stores/wallet'
	import type { Transaction } from 'algosdk'
	import { SignedTxn, WalletType } from '$lib/interfaces/wallet'
	import { signTransaction, signTransactions, submitTransaction } from '$lib/transaction-builder/common'
	import { onClearPera } from '$lib/helper/walletConnect'
	import TxStep from './TxStep.svelte'
	import { LoadingStatus } from '$lib/constants/enums'
    import { buildTransactionEscrowListing, createAppEscrowListing } from '$lib/transaction-builder/escrowListing'

	export let assetId: number
	export let isComplete = false
	
	let isAppSubmitting = false
	let isSetupAppSubmitting = false

	let open = false
	let walletType = $wallet.type
	let walletAccount = $wallet.account

	let appTxn: Transaction
	let setupAppTxn: Transaction[]
	let isAppTxnLoading: boolean
	let isSetupAppTxnLoading: boolean

	let signedAppTxn: SignedTxn
	let signedSetupAppTxn: SignedTxn[]
	let isSignedAppTxnLoading: boolean
	let isSignedSetupAppTxnLoading: boolean

    let appId: number
	let appCreateTxId: string
	let appCreateConfirmedRound: number
    let appSetupTxId: string
    let appSetupConfirmedRound: number

	let isUpdateDBLoading: boolean

	const clear = () => {
		open = false
		isAppSubmitting = false
		isSetupAppSubmitting = false
		
		appTxn = null
		setupAppTxn = null
		signedAppTxn = null
		signedSetupAppTxn = null
		
		isAppTxnLoading = false
		isSetupAppTxnLoading = false
		isSignedAppTxnLoading = false
		isSignedSetupAppTxnLoading = false
		
		appId = null
		appCreateTxId = null
		appCreateConfirmedRound = null
		appSetupTxId = null
		appSetupConfirmedRound = null

		isUpdateDBLoading = false

		if (walletType === WalletType.PERA) {
			onClearPera()
		}
	}

	const close = () => clear()
	
	/**
	 * Load up the transaction modal
	 * 
	 * 
	 */
	const confirmModal = () => {
		open = true
		isAppTxnLoading = true
		walletType = $wallet.type

        createAppTransaction()
	}

	/**
	 * Step 1. Create the Application and wait for user's signature
	 * 
	 */
    const createAppTransaction = () => {
        createAppEscrowListing(walletAccount, assetId)
            .then((response) => (appTxn = response))
			.catch(() => (appTxn = null))
			.finally(() => (isAppTxnLoading = false))
    }

	/**
	 * Step 2. User requests the signature to create the Application
	 * 
	 */
	const signAppTx = () => {
		if (appTxn) {
			isSignedAppTxnLoading = true
			signTransaction(walletType, appTxn, 'Create an Escrow Listing on DopePanda')
				.then((response) => {
					signedAppTxn = response
					submitAppTx()
				})
				.catch(() => (signedAppTxn = null))
				.finally(() => (isSignedAppTxnLoading = false))
		}
	}

	/**
	 * Step 3. Create Application is submitted on the blockchain
	 *  
	 */
	const submitAppTx = () => {
		if (signedAppTxn) {
			isAppSubmitting = true
			submitTransaction(signedAppTxn)
				.then(({ txId, txInfo, confirmedRound }) => {
					if (txInfo && txInfo['application-index']) {
						appId = txInfo['application-index']
					}

					appCreateTxId = txId
					appCreateConfirmedRound = confirmedRound
					
                    setupAppTransaction()
                    
                    // isUpdateDBLoading = true
					// updateDB()
				})
				.catch((error) => {
					appCreateTxId = null
					appCreateConfirmedRound = null
					console.log('error in submitting transaction', error)
				})
				.finally(() => (isAppSubmitting = false))
		}
	}

	/**
	 * Step 4. Application setup transaction is created
	 * 
	 */
    const setupAppTransaction = () => {
		console.log('setting app tx', appId)
        if (appId) {
            buildTransactionEscrowListing(walletAccount, appId, assetId, 10, 1)
                .then((response) => (setupAppTxn = response))
                .catch(() => (setupAppTxn = null))
                .finally(() => (isSetupAppTxnLoading = false))
        }
    }

	/**
	 * Step 5. User requests the signing of application setup transaction 
	 * 
	 */
	const signSetupAppTx = () => {
		if (setupAppTxn) {
			isSignedAppTxnLoading = true
			signTransactions(walletType, setupAppTxn, 'Setup your Escrow Listing on DopePanda')
				.then((response) => {
					signedSetupAppTxn = response
					submitSetupAppTx()
				})
				.catch(() => (signedSetupAppTxn = null))
				.finally(() => (isSignedSetupAppTxnLoading = false))
		}
	}

	/**
	 * Step 6. Setup application transaction is submitted on the blockchain
	 * 
	 */
	const submitSetupAppTx = () => {
		if (signedSetupAppTxn) {
			isSetupAppSubmitting = true
			submitTransaction(signedSetupAppTxn)
				.then(({ txId, confirmedRound }) => {
					appSetupTxId = txId
					appSetupConfirmedRound = confirmedRound

					console.log('app setup tx!', appSetupTxId, appSetupConfirmedRound)

                    isUpdateDBLoading = true
					updateDB()
				})
				.catch((error) => {
					appCreateTxId = null
					appCreateConfirmedRound = null
					console.log('error in submitting transaction', error)
				})
				.finally(() => (isSetupAppSubmitting = false))
		}
	}

	/**
	 * Step 7. Listing with the transaction is updated on Hasura
	 * 
	 */
	const updateDB = () => {
		console.log('updating listing in hasura')
		isComplete = true

		// if (txId && confirmedRound) {
			// updateDBMutation({ txId, wallet: walletAccount })
			// 	.then(() => {
			// 		isComplete = true
			// 		clear()
			// 	})
			// 	.finally(() => (isUpdateDBLoading = false))
		// }
	}
</script>

<div class="tx-modal tx-modal--contest-vote">
	<div class="tx-modal__action">
		<Button
            on:click={confirmModal}
            type="button"
            disabled={open}
            icon={(isAppSubmitting || isSetupAppSubmitting) && InlineLoading}>Create Listing</Button
        >
	</div>

	<Modal
		bind:open
		preventCloseOnClickOutside
		modalHeading="Create Listing"
		modalLabel={walletType && walletType.toUpperCase()}
		primaryButtonText="Sign Transaction"
		secondaryButtonText="Cancel"
		primaryButtonDisabled={!(!!(!appId && appTxn) || !!(appId && setupAppTxn))}
		passiveModal={isAppTxnLoading || isSetupAppTxnLoading || isAppSubmitting || isSetupAppSubmitting}
		on:click:button--secondary={() => (open = false)}
		on:open
		on:close={close}
		on:submit={appId ? signSetupAppTx : signAppTx}
	>
		<div class="tx-modal__inner">
			<div class="tx-modal__steps">

				<!-- Create Escrow Application -->
				{#if isAppSubmitting || (appCreateTxId && appCreateConfirmedRound)}
					<TxStep
						stepCount={1}
						label="Create Escrow Application"
						status={isAppSubmitting
							? LoadingStatus.IN_PROGRESS
							: appCreateTxId && appCreateConfirmedRound
							? LoadingStatus.SUCCESS
							: LoadingStatus.NONE}
						descriptionPending="Submitting transaction on Algorand ..."
						descriptionSuccess={`Application created with ID: ${appId}`}
					/>
				{:else if (isSignedAppTxnLoading || signedAppTxn)}
					<TxStep
						stepCount={1}
						label="Create Escrow Application"
						status={isSignedAppTxnLoading
							? LoadingStatus.IN_PROGRESS
							: signedAppTxn
							? LoadingStatus.SUCCESS
							: LoadingStatus.NONE}
						descriptionPending="Waiting for signature ..."
						descriptionSuccess="Signature complete"
					/>
				{:else}
					<TxStep
						stepCount={1}
						status={isAppTxnLoading
							? LoadingStatus.IN_PROGRESS
							: appTxn
							? LoadingStatus.SUCCESS
							: LoadingStatus.NONE}
						label="Create Escrow Application"
						descriptionPending="Building your transaction ..."
						descriptionSuccess="Transaction ready, sign with your wallet."
					/>
				{/if}

				<!-- Submit Transaction -->
				{#if (isSignedSetupAppTxnLoading || signedSetupAppTxn)}
					<TxStep
						stepCount={2}
						label="Setup Escrow Application"
						status={isSignedSetupAppTxnLoading
							? LoadingStatus.IN_PROGRESS
							: signedSetupAppTxn
							? LoadingStatus.SUCCESS
							: LoadingStatus.NONE}
						descriptionPending="Waiting for signature ..."
						descriptionSuccess="Signature complete"
					/>
				{:else}
					<TxStep
						stepCount={2}
						label="Setup Escrow Application"
						status={isSetupAppTxnLoading
							? LoadingStatus.IN_PROGRESS
							: setupAppTxn
							? LoadingStatus.SUCCESS
							: LoadingStatus.NONE}
						descriptionPending="Building your transaction ..."
						descriptionSuccess="Transaction ready, sign with your wallet."
					/>
				{/if}
				
				<TxStep
					stepCount={3}
					status={isSetupAppSubmitting
						? LoadingStatus.IN_PROGRESS
						: appSetupTxId && appSetupConfirmedRound
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
						: appSetupTxId && appSetupConfirmedRound
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

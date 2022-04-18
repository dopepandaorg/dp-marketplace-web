<script lang="ts">
	import {
		Button,
		ContentSwitcher,
		FileUploaderDropContainer,
		InlineLoading,
		Switch
	} from 'carbon-components-svelte'
	import AssetCIDInput from './AssetCIDInput.svelte'
	import { upload } from '$lib/helper/web3StorageClient'
	import { Close, SwitchLayer_2, TrashCan } from 'carbon-icons-svelte'

	export let label = 'Media'
	export let value
	export let isValid = false

	let selectedTypeIndex = 0
	let fileUploader

	let fileSourceUrl = null
	let fileCID = null
	let isFileCIDValid = false
	let isFileUploading = false

	let inputCID = ''
	let isInputCIDValid = false

	const selectFile = (files: File[]) => {
		if (FileReader && files && files.length) {
			var fr = new FileReader()
			fr.onload = function () {
				fileSourceUrl = fr.result
			}
			fr.readAsDataURL(files[0])

			// Upload file
			fileCID = null
			isFileCIDValid = false
			isFileUploading = true
			upload(files[0])
				.then((cid) => {
					fileCID = cid
					isFileCIDValid = true
				})
				.catch(() => {
					fileCID = null
					isFileCIDValid = false
				})
				.finally(() => {
					isFileUploading = false
				})
		} else {
			fileCID = null
			isFileCIDValid = false
		}
	}

	const cancelFileUpload = () => {
		isFileUploading = false
	}

	const clearFileUpload = () => {
		isFileUploading = false
		fileSourceUrl = null
		fileCID = null
		isFileCIDValid = false
	}

	const changeFileUpload = () => {
		fileUploader.click()
	}

	$: {
		if (selectedTypeIndex === 0) {
			value = fileCID
			isValid = isFileCIDValid
		} else if (selectedTypeIndex === 1) {
			value = inputCID
			isInputCIDValid = inputCID.length >= 8
			isValid = isInputCIDValid
		}
	}
</script>

<div class="media-input bx--form-item">
	<label for="">{label}*</label>

	<div class="media-input-wrapper type--{selectedTypeIndex}">
		<div class="media-input__switch">
			<ContentSwitcher bind:selectedIndex={selectedTypeIndex}>
				<Switch text="Upload Media" />
				<Switch text="Enter IPFS CID" />
			</ContentSwitcher>

			<div class="media-input__instructions">
				Supported Formats: <br />JPG, PNG, GIF, BMP, MP4
			</div>

			{#if selectedTypeIndex === 0}
				<div class="media-input__status">
					{#if selectedTypeIndex === 0 && isFileUploading}
						<InlineLoading status="active" description="Uploading ..." />
					{:else if selectedTypeIndex === 0 && !isFileUploading && fileCID && isFileCIDValid}
						<InlineLoading status="finished" description="Uploaded" />
					{/if}
				</div>

				{#if !isFileUploading && fileCID}
					<div class="media-input__file-cid">
						<code
							><a href="ipfs://{fileCID}" target="_blank" rel="noopener noreferrer"
								>ipfs://{fileCID}</a
							></code
						>
					</div>
				{/if}

				<div class="media-input__action">
					{#if isFileUploading}
						<Button size="small" kind="danger" icon={Close} on:click={cancelFileUpload}
							>Cancel</Button
						>
					{:else if !isFileUploading && fileCID}
						<Button size="small" kind="secondary" icon={SwitchLayer_2} on:click={changeFileUpload}
							>Change</Button
						>
						<Button size="small" kind="danger-tertiary" icon={TrashCan} on:click={clearFileUpload}
							>Clear</Button
						>
					{/if}
				</div>
			{/if}
		</div>

		{#if selectedTypeIndex === 1}
			<div class="media-input__cid">
				<AssetCIDInput bind:value={inputCID} />
			</div>
		{:else}
			<div class="media-input__upload">
				{#if fileSourceUrl}
					<div class="media-input__upload-preview">
						<img src={fileSourceUrl} alt="" />
					</div>
				{/if}

				<FileUploaderDropContainer
					bind:ref={fileUploader}
					labelText={!fileSourceUrl ? 'Select File' : ''}
					accept={['.jpg', '.jpeg']}
					on:change={(e) => {
						selectFile(e.detail)
					}}
				/>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.media-input-wrapper {
		display: flex;
		width: 100%;

		&.type--1 {
			flex-direction: column;
		}

		.media-input__instructions {
			margin-top: 1.5rem;
			line-height: 1.4;
			color: var(--dp--text-05);
		}

		.media-input__switch {
			flex: 1;
			max-width: 320px;
		}

		.media-input__upload {
			flex: 1;
			margin-left: 2.5rem;
		}

		.media-input__cid {
			margin-top: 2.5rem;
		}

		.media-input__status {
			margin-top: 1rem;
		}

		.media-input__file-cid {
			margin-top: 0.5rem;
			font-size: 0.625rem;

			display: flex;
			align-items: center;
			max-width: 320px;

			code {
				font-size: 0.75rem;
				text-overflow: ellipsis;
				white-space: normal;
				overflow: hidden;
			}
		}

		.media-input__action {
			margin-top: 1rem;
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 2rem;
		}
	}

	.media-input__upload {
		position: relative;
		min-height: 320px;

		.media-input__upload-preview {
			padding: 10px;

			img {
				max-width: 100%;
				min-height: calc(320px);
				object-fit: contain;
				object-position: center;
			}
		}

		:global(.bx--file__drop-container) {
			height: 100%;
			text-align: center;
			justify-content: center;
			align-items: center;
			border-radius: 5px;
		}

		:global(label) {
			width: 100%;
			height: 100%;
			margin: 0;
			max-width: none;
			border-radius: 5px;
		}

		:global(.bx--file) {
			height: 100%;
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;

			z-index: 10;
		}
	}
</style>

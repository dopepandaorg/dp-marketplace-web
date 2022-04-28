<script lang="ts">
	import {
		Button,
		ContentSwitcher,
		FileUploaderDropContainer,
		InlineLoading,
		Select,
		SelectItem,
		Switch
	} from 'carbon-components-svelte'
	import AssetCIDInput from './AssetCIDInput.svelte'
	import { upload } from '$lib/helper/web3StorageClient'
	import Close from 'carbon-icons-svelte/lib/Close.svelte'
	import SwitchLayer_2 from 'carbon-icons-svelte/lib/SwitchLayer_2.svelte'
	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte'
	import { convertIPFSCIDToUrl } from '$lib/constants/assets'

	export let label = 'Media'
	export let value
	export let mime = null
	export let isValid = false
	export let acceptedFormats: string[] = ['.jpg', '.jpeg', '.png', '.gif']
	export let aspectRatio: '1x1' | '16x9' = '1x1'

	let selectedTypeIndex = 0
	let fileUploader
	let mimeType = null
	let mimeTypeInput = 'image/jpg'

	let fileSourceUrl: string = value ? convertIPFSCIDToUrl(value) : null
	let fileCID = value ? value : null
	let isFileCIDValid = false
	let isFileUploading = false

	let inputCID = value ? `ifps://${value}` : ''
	let isInputCIDValid = false

	const selectFile = (files: File[]) => {
		if (FileReader && files && files.length) {
			let file = files[0]
			mimeType = file.type

			var fr = new FileReader()
			fr.onload = function () {
				fileSourceUrl = fr.result as string
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
			mime = mimeType || null
			isValid = isFileCIDValid
		} else if (selectedTypeIndex === 1) {
			value = inputCID
			mime = mimeTypeInput
			isInputCIDValid = inputCID.length >= 8 && inputCID.startsWith('ipfs://')
			isValid = isInputCIDValid
		}
	}
</script>

<div class="media-input bx--form-item">
	<label for="">{label}*</label>

	<div class="media-input-wrapper type--{selectedTypeIndex} ratio--{aspectRatio}">
		<div class="media-input__switch">
			<div>
				<ContentSwitcher bind:selectedIndex={selectedTypeIndex}>
					<Switch text="Upload Media" />
					<Switch text="Enter IPFS CID" />
				</ContentSwitcher>

				<div class="media-input__instructions">
					Supported Formats: <br />{acceptedFormats.join(', ')}
				</div>
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
				<Select labelText="Mime Type" bind:selected={mimeTypeInput}>
					<SelectItem value="image/jpg" text="image/jpg" />
					<SelectItem value="image/jpeg" text="image/jpeg" />
					<SelectItem value="image/png" text="image/png" />
					<SelectItem value="image/gif" text="image/gif" />
				</Select>
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
					accept={acceptedFormats}
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

			&:last-child {
				margin-right: 0;
			}
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

		&.type--1 {
			flex-direction: column;
		}

		&.ratio--16x9 {
			flex-direction: column;

			.media-input__upload {
				min-height: 200px;
				max-height: 200px;
				margin-left: 0;
				margin-top: 1.5rem;

				.media-input__upload-preview {
					img {
						width: 100%;
						height: 180px;
						min-height: 180px;
						object-fit: cover;
					}
				}
			}
		}

		@media screen and (max-width: 767px) {
			flex-direction: column;

			.media-input__upload {
				margin-left: 0;
				margin-top: 1.5rem;
			}
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

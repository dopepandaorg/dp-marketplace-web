<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import SelectWindow from 'carbon-icons-svelte/lib/SelectWindow.svelte'
	import ProfileShowcaseSelectForm from './ProfileShowcaseSelectForm.svelte'

	const dispatch = createEventDispatcher()

	export let isEditable = true
	export let index

	let open = false

	const openSelectAsset = () => {
		open = true
	}

	const select = (e: CustomEvent) => {
		if (e.detail.id) {
			dispatch('select', {
				id: e.detail.id
			})

			open = false
		}
	}
</script>

<div class="asset-tile" on:click={isEditable && openSelectAsset} class:is-editable={isEditable}>
	<div class="asset-tile__inner">
		<div class="asset-tile__image">
			{#if isEditable}
				<div class="asset-tile__image__inner">
					<SelectWindow />
					<div class="asset-tile__image__placeholder">Select Asset</div>
				</div>
			{:else}
				<div class="asset-tile__image__inner">
					<div class="asset-tile__image__placeholder">No Asset</div>
				</div>
			{/if}
		</div>
		<div class="asset-tile__content">
			<div class="asset-tile__title-wrap">
				<div class="asset-tile__creator-avatar" style="border-radius: 50%; overflow: hidden;">
					<div style="width: 40px; height: 40px; background-color: var(--dp--black-05);" />
				</div>

				<div class="asset-tile__title">
					<div style="width: 120px; height: 2rem; background-color: var(--dp--black-05);" />
				</div>
			</div>

			<div class="asset-tile__meta">
				<div class="asset-tile__meta-item">
					<div class="asset-tile__meta-item__label">Unit</div>
					<div class="asset-tile__meta-item__value">
						<div style="width: 60px; height: 1rem; background-color: var(--dp--black-05);" />
					</div>
				</div>
				<div class="asset-tile__meta-item">
					<div class="asset-tile__meta-item__label">Listing</div>
					<div class="asset-tile__meta-item__value">
						<div style="width: 60px; height: 1rem; background-color: var(--dp--black-05);" />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<ProfileShowcaseSelectForm {index} bind:open on:select={select} />

<style lang="scss">
	.asset-tile {
		position: relative;
		display: flex;
		align-items: center;
		border-radius: 5px;
		min-width: 0;
		border: 2px dashed var(--dp--black-05);
		transition: all 0.125s;

		&__inner {
			display: flex;
			flex-direction: column;

			width: 100%;
		}

		&__image {
			position: relative;
			width: 100%;
			border-radius: 5px 5px 0 0;
			overflow: hidden;
			padding-top: 100%;
			opacity: 0.5;
			transition: opacity 0.125s;

			:global(svg) {
				width: 2.5rem;
				height: 2.5rem;
			}

			&__placeholder {
				font-size: 1.125rem;
				text-align: center;
				margin-top: 1rem;
			}

			:global(img) {
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;

				max-width: 100%;
				height: 100%;
				object-fit: cover;
				object-position: center;

				transition: transform 0.3s;
			}

			:global(.asset-tile__image__inner) {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				text-align: center;
			}
		}

		&__content {
			position: relative;
			width: 100%;
			min-height: 120px;
			top: -4rem;
			transform: translateY(4rem);
			padding: 2.25rem 1.25rem 1.25rem;

			background-color: var(--dp--black-03);
			transition: transform 0.125s;
		}

		&__creator-avatar {
			position: absolute;
			top: -2rem;

			width: 2rem;
			height: 2rem;

			transform: translateY(-60%);
		}

		&__title-wrap {
			position: relative;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			padding-top: 1rem;

			@media screen and (min-width: 768px) {
				flex-direction: row;
				padding-top: 0;
			}
		}

		&__title {
			font-size: 1.375rem;
			font-weight: 500;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		&__meta {
			margin-top: 1.25rem;

			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 2rem;
		}

		&__meta-item {
			display: flex;
			flex-direction: column;
			align-items: center;

			@media screen and (min-width: 768px) {
				align-items: flex-start;
			}

			&__label {
				font-size: 0.75rem;
				margin-bottom: 0.375rem;
				opacity: 0.5;
			}

			&__value {
				font-size: 1rem;
				font-weight: 500;

				display: flex;
				align-items: center;
			}
		}

		&.is-editable {
			&:hover {
				cursor: pointer;
				background-color: var(--dp--black-02);

				.asset-tile__image {
					:global(img) {
						transform: scale(1.05);
					}

					opacity: 1;
				}
			}
		}
	}
</style>

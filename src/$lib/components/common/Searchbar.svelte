<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { Search } from 'carbon-components-svelte'
	import { doSearch } from '../../../stores/search'

	const params = $page.params

	let searchValue = params.q || ''
	const onSubmit = (v: string) => {
		if (v && v.length > 0) {
			goto(`/search/${encodeURIComponent(v)}`)
			doSearch(v)
		}
	}
</script>

<div class="search-bar">
	<Search
		placeholder="Search for NFTs, collections or artists"
		bind:value={searchValue}
		on:keyup={(e) => {
			if (e.code === 'Enter') {
				onSubmit(searchValue)
			}
		}}
	/>
</div>

<style lang="scss">
	.search-bar {
		:global(input) {
			border: 0;
			border-radius: 5px;
		}

		:global(.bx--search-close) {
			border-color: transparent;
			border-radius: 0 5px 5px 0;
		}

		:global(.bx--search-close:before) {
			background-color: transparent;
		}
	}
</style>

<script lang="ts">
	import { ToastNotification } from 'carbon-components-svelte'
	import { toasts } from '../../../stores/toast'

	let toastList = []
	toasts.subscribe((t) => {
		toastList = t
	})
</script>

{#if toastList}
	<section>
		{#each toastList as toast (toast.id)}
			<ToastNotification lowContrast={true} kind={toast.kind} title={toast.title} subtitle={toast.subtitle} />
		{/each}
	</section>
{/if}

<style lang="scss">
	section {
		position: fixed;
		top: 5rem;
		left: auto;
		right: 0.75rem;
		width: auto;
		display: flex;
		justify-content: center;
		flex-direction: column;
		z-index: 1000;
	}
</style>

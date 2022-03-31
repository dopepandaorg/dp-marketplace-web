<script context="module">
	export function load({ error, status }) {
		return {
			props: {
				title: `${status}: ${error.message}`
			}
		}
	}
</script>

<script>
	export let title
</script>

<section class="section">
	<div class="container">
		<h1>{title}</h1>
	</div>
</section>

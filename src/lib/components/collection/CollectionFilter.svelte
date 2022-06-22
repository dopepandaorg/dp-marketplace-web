<script>
	import { Accordion, AccordionItem, Dropdown, SelectableTile } from 'carbon-components-svelte'
</script>

<div class="collection-filter">
	<Accordion>
		<AccordionItem title="Attributes">
			<div role="group" aria-label="selectable tiles">
				<SelectableTile selected>Multi-select Tile</SelectableTile>
				<SelectableTile>Multi-select Tile</SelectableTile>
				<SelectableTile>Multi-select Tile</SelectableTile>
			</div>
		</AccordionItem>
		<AccordionItem title="Background">
			<p>
				Analyze text to extract meta-data from content such as concepts, entities, emotion,
				relations, sentiment and more.
			</p>
		</AccordionItem>
		<AccordionItem title="More">
			<p>
				Translate text, documents, and websites from one language to another. Create industry or
				region-specific translations via the service's customization capability.
			</p>
		</AccordionItem>
	</Accordion>
</div>

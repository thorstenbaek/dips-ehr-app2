<script>
    import { createEventDispatcher } from 'svelte';

    export let document;

    const dispatch = createEventDispatcher();

    const noMonthNames = ["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "des"];    

    function formatDate(date) {
        const d = new Date(date);
        const now = new Date();


        if (now.getFullYear() == d.getFullYear()) {
            return `${d.getDate()}. ${noMonthNames[d.getMonth()]} kl. ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
        } else {            
            return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth()).padStart(2, '0')}.${d.getFullYear()}`;
        }
    }

    function openDocument(document) {
        dispatch("openDocument", document);
    }

</script>

{#if document}
<tr class="document-item" on:click={openDocument(document)}>
    <td>{formatDate(document.date)}</td>
    <td>{document.description}</td>    
</tr>  
{/if}

<style>
    td {        
        padding: 2px 4px 2px 4px;
    }
</style>
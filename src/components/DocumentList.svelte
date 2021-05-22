<script>
    import {onMount} from "svelte";        
    import {settings, patient, documentApps, instances, active} from "../stores/AppStore";
    import DocumentItem from "./DocumentItem.svelte";

    let documents = [];
    
    let sortBy = {col: "id", ascending: true};
	
	$: sort = (column) => {
		
		if (sortBy.col == column) {
			sortBy.ascending = !sortBy.ascending
		} else {
			sortBy.col = column
			sortBy.ascending = true
		}
		
		// Modifier to sorting function for ascending or descending
		let sortModifier = (sortBy.ascending) ? 1 : -1;
		
		let sort = (a, b) => 
			(a[column] < b[column]) 
			? -1 * sortModifier 
			: (a[column] > b[column]) 
			? 1 * sortModifier 
			: 0;
		
            documents = documents.sort(sort);
	}

    onMount(async () => {
        if ($settings)
        {
            const url = `${$settings.FhirServiceUri}/documentreference?patient=${$patient.id}`;
            var response = await fetch(url);        
            var bundle = await response.json();    
            
            documents = bundle?.entry.map(d => d.resource)        
        }
    })

    function openDocument(e) {    
        const document = e.detail;
        var apps = $documentApps.filter(a => a.mimetype == document.content[0].attachment.contentType.toLowerCase());
        if (apps.length > 0)
        {
            var instance = {
                title: document.description,
                component: apps[0].component,
                props: {app: apps[0].app, document: document}
            };

            active.set(instance);
            instances.set([...$instances, instance]);
        }    
    }

    function sort(method) {
        documents = documents.sort(method);
    }    

</script>

<div class="document-list"> 
    <table>                
        <thead>
            <th on:click={() => sort("date")}>Hendelsestid</th>
                <th on:click={() => sort("description")}>Dokumentbetegnelse</th>
        </thead>
    <tbody>
        {#each documents as document}
            <DocumentItem {document} on:openDocument={openDocument}/>    
        {/each}
    </tbody>
    <tfoot></tfoot>
    </table>
</div>

<style>
    .document-list {
        overflow: auto;
        background: var(--lighter-gray);    
        width: 100%;
        height: 100%;
    } 
    
    th {
        background: var(--lighter-gray);
        padding: 2px 5px 2px 5px;
    }

    table {                        
        width:100%;
        text-align: left;
    }

</style>

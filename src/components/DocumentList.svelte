<script>
    import {onMount} from "svelte";        
    import {settings, patient, documentApps, instances, active} from "../stores/AppStore";

    let documents = [];

    onMount(async () => {
        if ($settings)
        {
            const url = `${$settings.FhirServiceUri}/documentreference?patient=${$patient.id}`;
         
            const headers = new Headers();
            headers.append("Ocp-Apim-Subscription-Key", "0c0b700479fe4cc691497740eaaaef6f");
            headers.append("Ticket-Header", "02591eea-57de-4d5a-9d66-c7f968c81afa");
            headers.append("Cache-Control", "no-cache");

            try {
                var response = await fetch(url, {headers});
                var bundle = await response.json();            
                documents = bundle?.entry.map(d => d.resource)                    
            }
            catch (e) {
                dispatch("error", e);
            }
        }
    })

    const openDocument = document => 
    {
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

</script>

<div class="document-list"> 
    <table>                
    <thead></thead>           
    <tbody>
        {#each documents as document}
        <tr class="document-item" on:click={openDocument(document)}>
            <td>{document.description}</td>
            <td>{document.date}</td>
        </tr>  
        {/each}
    </tbody>
    <tfoot></tfoot>
    </table>
</div>

<style>
    .document-list {
        overflow: auto;
        background: hsl(0, 0%, 91%);    
        width: 100%;
        height: 100%;
    }    

</style>

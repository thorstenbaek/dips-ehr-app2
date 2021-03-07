<script>
    import {patient, settings} from "../stores/AppStore";
    export let app;

    let url;

    $: {
        url = `${app?.url}?iss=${$settings.FhirServiceUri}&launch=${$patient?.id}`
        console.log(url);
    }
    
</script>

<iframe class="app-frame" 
    title="app"     
    frameBorder="0"
    src={url}    
/>

<style>
    .app-frame {        
        border: 0;
        width: 1px;
        min-width: 100%;
        height: 100%;
        margin: 0;
        overflow: auto;
    }
</style>

<script>
    import {patient, settings} from "../stores/AppStore";
    export let app;
    export let document;

    let url;

    $: {        
        url = `${app?.url}?iss=${$settings.FhirServiceUri}&launch=${$patient?.id}::DocumentReference/${document.id}`;
        console.log(url);
    }
    
</script>

<div class="app-frame">
    <iframe
        title="app"     
        frameBorder="0"
        scrolling="no"
        src={url}    
    />
</div>

<style>
    .app-frame { 
        padding: 0;
        margin: 0;
        height: 100%;                
        overflow: hidden;
    }

    iframe {
        overflow: hidden;
        width: 1px;
        min-width: 100%;
        height: 100%;
    }
</style>

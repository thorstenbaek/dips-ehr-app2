<script>
    import {configUrl, settings} from "../stores/AppStore";
</script>

<div class="about select">
    <h2>DIPS EHR web application</h2>
    <p>
        Version: v1.0.0.3
    </p>            
    <h2>Configuration</h2>    
    <p>
        {$configUrl}
    </p>
    <h2>Services</h2>
    <p>
        FHIR Service: {$settings?.FhirServiceUri} <br/>
        Security Service: {$settings?.SecurityServiceUri}
    </p> 
    <h2>
        Apps
    </h2>       
    <ul>
        {#if $settings}
            {#each $settings?.SmartOnFhirApps as {name, url}}
                <li>{name} : {url}</li>
            {/each}
        {/if}
    </ul>
</div>
   

<style>
    h2 {
        margin: 15px 0 0 0;
    }

    .about {
        background: var(--lighter-gray);
        padding: 5px 10px;        
        position: relative;
        height: calc(100% - 72px)
    }
</style>
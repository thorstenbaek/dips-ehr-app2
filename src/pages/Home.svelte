<script>
    import Search from "../components/Search.svelte";
    import Results from "../components/Results.svelte";
    import Workspace from "../components/Workspace.svelte";
    import {patient} from "../stores/AppStore";

    let results;

    const onSearch = e => {
        results = e.detail;            
    }

    const onError = e => {
        console.log("Search error", e);
    }

    const close = () => {
        console.log("close_home");
        patient.set(null);
    }

    const selectPatient = e => {        
        results = null;
        patient.set(e.detail);        
    }
</script>
<div class="home">
    {#if $patient}
        <Workspace on:close={close}/>
    {:else}
        <Search on:onSearch={onSearch} on:error={onError}/>
        {#if results}
            <Results results={results} on:selectPatient={selectPatient}/>
        {/if}
    {/if}
</div>
<style>
    .home {
        background: linear-gradient(0deg, hsl(0, 0%, 10%) 0%,hsl(0, 0%, 20%) 20%, hsl(0, 0%, 30%) 100%);        
        padding: 0;        
        position: relative;
        min-height: calc(100% - 62px)
    }
</style>
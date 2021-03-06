<script>
    import Search from "../components/Search.svelte";
    import Results from "../components/Results.svelte";
    import Workspace from "../components/Workspace.svelte";
    import {patient} from "../stores/AppStore";

    let results;

    const onSearch = e => {
        results = e.detail;            
    }

    const selectPatient = e => {
        patient.set(e.detail);
    }
</script>
<div class="home">
    {#if $patient}
        <Workspace/>
    {:else}
        <Search on:onSearch={onSearch}/>
        {#if results}
            <Results results={results} on:selectPatient={selectPatient}/>
        {/if}
    {/if}
</div>
<style>
    .home {
        background: #e6e6e6;
        padding: 5px 10px;        
        position: relative;
        min-height: calc(100% - 72px)
    }
</style>
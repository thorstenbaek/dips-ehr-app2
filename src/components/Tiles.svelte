<script>
    import {patientApps, instances, active} from "../stores/AppStore";
    import Tile from "./Tile.svelte";
    import PatientApp from "../apps/PatientApp.svelte";

    function onRun(tile)
    {
        if (!$instances.includes(tile))
        {
            var instance = {
                title: tile.name,
                component: tile.component,
                props: {app: tile.app}
            };
            active.set(instance);
            instances.set([...$instances, instance]);
        }
    }

</script>

<div class="tiles">
    <ul>
    {#each $patientApps as app}
        <Tile app={app} onRun={onRun}/>
    {/each}
    </ul>
</div>

<style>
    .tiles {
        position: absolute;        
        top: 60px;
        bottom: 0;        
        width: 72px;
        background: var(--dark-blue);
    }

    .tiles ul {
        margin: 0;
        padding: 0;
    }
</style>
<script>
    import TileIcon from './TileIcon.svelte';
    //import GrowthChartIcon from './GrowthChartIcon.svelte';
    export let app;
    export let active = false;
    export let onRun = null;

    var classes = ["tile", "noselect"];
    if(active)
    {
        classes.push("inactive");
    }    

    $: letter = app?.name[0];

    function click(app)
    {
        onRun(app);        
    }
</script>


<li class={classes.join(' ')} value={app}>
    <button on:click={click(app)} title="{app.name}">                
        <TileIcon name={app.name}/>            
    </button>
</li>



<style>
    .tile {        
        display: block;
    }

    .tile button {
        opacity: 0.8;        
        font-size: 1.5em;
        color: white;
        margin: 9px 18px;
        padding: 0 5px;
        width: 34px;
        border: none;        
        background-color: transparent;
    }

    .tile.inactive button {
        opacity: 0.2;        
    }

    .tile button:hover {
        opacity: 1;
    }

    .tile.inactive button:hover {
        opacity: 0.2;
        font-weight: normal;
    }
</style>
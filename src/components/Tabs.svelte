<script>    
    import {instances, active} from "../stores/AppStore";

    const tabClick = instance => active.set(instance);
    const closeTab = instance => {
        var filtered = $instances.filter(i => i != instance);
        active.set(filtered[filtered.length - 1]);        
        $instances = filtered;
    }
</script>
    <div class="tabs">
        <ul>
            {#each $instances as instance}
            <li class={$active === instance ? "active":""}>
                <span on:click={tabClick(instance)}>
                    {instance.title}
                    <button on:click={closeTab(instance)}>X</button>
                </span>
            </li>
            {/each}
        </ul>
        {#each $instances as instance}            
            <div class="border {$active === instance ? "active":""}">
                <div class="content">
                    <svelte:component this={instance.component} {...instance.props}/>
                </div>
            </div>
            
        {/each}
    </div>
<style>
    .tabs {
        position: absolute;
        top: 60px;
        left: 72px;        
        bottom: 0;
        right: 0;        
    }
    .border {
        display: none;
        position:absolute;
        top:30px;
        left: 0;
        bottom: 0;
        right: 0;
        padding: 5px;
        margin: 0;
        overflow: hidden;        
        background: var(--gray);
    }

    .active {
        display: block;
    }

	.content {
        overflow: hidden;        
        background: var(--lightest-gray); 
        height: 100%;
        widows: 100%;
    }
    ul {
        display: flex;
        flex-wrap: wrap;
        padding: 0;
        margin-top: 3px;
        list-style: none;
    }
    li {        
        margin-right: 3px;                
    }

    span {
        background: var(--lighter-gray);
        display: block;
        cursor: pointer;
        padding: 2px 4px 5px 5px
    }

    span:hover {
        background: var(--lightest-gray);
    }

    li.active > span {
        color: var(--lightest-gray);
        background: var(--gray);
    }

    button:hover {
        color: var(--gray);        
    }    

    button {
        color: var(--dark-gray);
        margin: 0px;
        padding: 0px;
        background: transparent;
        border: none;
        padding-left: 5px;
        font-weight: bold;
    }

    li.active > span > button {
        color: var(--lightest-gray);
    }

    li.active > span > button:hover {
        color: var(--lighter-gray);        
    }
</style>
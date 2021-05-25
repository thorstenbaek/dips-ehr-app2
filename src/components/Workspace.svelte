<script>
    import Banner from "./Banner.svelte";
    import Tiles from "./Tiles.svelte";
    import Tabs from "./Tabs.svelte";
</script>

<div class="workspace">
    <Banner/>
    <Tiles/>
    <Tabs/>
</div>

<style>
    .workspace {
        position:absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;        
        background: var(--dark-gray);
    }
</style>
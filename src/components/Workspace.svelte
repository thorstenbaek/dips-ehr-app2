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

        /*background: linear-gradient(0deg, hsl(0, 0%, 10%) 0%,hsl(0, 0%, 20%) 20%, hsl(0, 0%, 30%) 100%);*/
        background: var(--dark-gray);
    }
</style>
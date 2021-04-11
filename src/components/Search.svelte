<script>
    import {settings} from "../stores/AppStore";
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    async function doSearch(query)
    {
        var url = $settings.FhirServiceUri + "/Patient";
        if (query != null)
        {
            url = url + "?family=" + query;
        }

        const headers = new Headers();
        headers.append("Ocp-Apim-Subscription-Key", "0c0b700479fe4cc691497740eaaaef6f");
        headers.append("Ticket-Header", "02591eea-57de-4d5a-9d66-c7f968c81afa");
        headers.append("Cache-Control", "no-cache");

        try {
            var response = await fetch(url, {headers});
            var data = await response.json();            
            dispatch("onSearch", data);
        }
        catch (e) {
            dispatch("error", e);
        }
    }

    async function submit(e) {
        e.preventDefault();
        
        const fd = new FormData(this);
        const values = Object.fromEntries([...fd]);
        
        await doSearch(values.search);
    }
</script>

<form on:submit={submit}>
    <div class="search">
        <input type="text"
            class="search-input" 
            name="search"
            placeholder="Search patient..." />
        <button class="search-button" type="submit">Search</button>
    </div>
</form>

<style>
    .search {    
        background-color: #e6e6e6;        
    }

    .search-input {
        margin: 5px 5px;
    }

    .search-button {
        background:#15576b;    
        color: white;
    }

    .search-button:hover {
        color: #1fa7b2;
    }
</style>
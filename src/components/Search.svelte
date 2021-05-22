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

        var response = await fetch(url);
        var data = await response.json();
        dispatch("onSearch", data);
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
        background-color: var(--lighter-gray);        
    }

    .search-input {
        margin: 5px 5px;
    }

    .search-button {
        background:var(--dark-blue);    
        color: white;
    }

    .search-button:hover {
        color: var(--blue);
    }
</style>
<script>
    import {Link} from "svelte-routing";    
</script>

<header class="toolbar">
    <nav class="toolbar__navigation">
        <div class="toolbar__drawer-toggle-button">
            <!-- <DrawerToggleButton click={props.drawerClickHandler}/> -->
        </div>
        <div class="toolbar__logo">
            <a href="/">
            <img alt="DIPS Sandbox logo" height="52" width="239" src="images/DIPS-Sandbox-logo.png"/> 
            </a>            
        </div>
        <div class="spacer"/>
        <div class="toolbar__navigation-items">
            <ul>                    
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </div>        
    </nav>
    <div class="dips-line"/>
</header>

<style>
.toolbar {
    width: 100%;
    height: 62px;
    background: var(--lighter-gray);
}

.dips-line {
    position: relative;
    background: var(--orange);    
    left: 0;
    bottom: 0;
    width: 180px;
    height: 4px;
}

.toolbar__navigation {
    display: flex;
    background: var(--dark-blue);
    height: calc(100% - 4px);
    align-items: center; 
    padding: 0 1rem;
} 

.toolbar__logo {
    margin-top: 3px;    
    margin-left: 1rem;
}

.toolbar__logo a {
    color: white;
    text-decoration: none;
    font-size: 1.8rem;     
}

.spacer {
    flex: 1;
}

.toolbar__navigation-items ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
}

.toolbar__navigation-items li {
    padding: 0 0.5rem;    
}

/* Improve mobile experience later
@media (max-width: 768px) {
    .toolbar__navigation-items {
        display: none;
    }
}*/

/*@media (min-width: 769px) {*/
    .toolbar__drawer-toggle-button {
        display: none;
    }
    .toolbar__logo {
        margin-left: 0;
    }
/*}*/
</style>
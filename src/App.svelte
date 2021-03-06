<script>
	import {Router, Route} from "svelte-routing";
	import Toolbar from "./components/Toolbar.svelte";
	import Home from "./pages/Home.svelte";
	import About from "./pages/About.svelte";

	export let url = "";
</script>

<Router url={url}>
	<Toolbar/>
	<Route path="/">
		<Home/>
	</Route>
	<Route path="/about">
		<About/>
	</Route>
</Router>





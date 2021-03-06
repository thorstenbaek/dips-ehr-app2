<script>
	import {Router, Route} from "svelte-routing";
	import Home from "./pages/Home.svelte";
	import About from "./pages/About.svelte";

	export let url = "";
</script>

Main
<Router url={url}>
	<Route path="/">
		<Home/>
	</Route>
	<Route path="/about">
		<About/>
	</Route>
</Router>



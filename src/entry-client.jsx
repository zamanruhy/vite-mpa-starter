import { hydrate } from "solid-js/web";
import { MetaProvider } from "solid-meta";
import { App } from "./App";
// import Browser from "./Browser";
import { Router } from "@solidjs/router";

hydrate(
	() => (
		<Router>
			<MetaProvider>
				<App />
			</MetaProvider>
		</Router>
	),
	document.getElementById("app")
);

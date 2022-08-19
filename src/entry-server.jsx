import { renderToString, generateHydrationScript } from "solid-js/web";
import { renderTags, MetaProvider } from "solid-meta";
import { App } from "./App";
import { Router } from "@solidjs/router";

export function render(url) {
	let tags = [];
	const body = renderToString(() => (
		<Router url={url}>
			<MetaProvider tags={tags}>
				<App />
			</MetaProvider>
		</Router>
	));
	const hydration = generateHydrationScript();
	const head = renderTags(tags);
	return {
		head,
		hydration,
		body,
	};
}

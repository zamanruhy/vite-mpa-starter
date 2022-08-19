import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
	plugins: [solid({ ssr: true })],
	ssr: {
		// Vite attempts to load this as a Commonjs dependency
		noExternal: ["solid-meta", "@solidjs/router"],
	},
	assetsInclude: [/\/static\/.*$/],
});

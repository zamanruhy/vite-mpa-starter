import { createSignal } from "solid-js";
import { Title, Link as LinkMeta } from "solid-meta";
import { Link, Route, Routes } from "@solidjs/router";
import favicon from "../static/favicon.svg?url";

const pages = import.meta.glob("./pages/*.jsx", { eager: true });

const routes = Object.keys(pages).map((path) => {
	const name = path.match(/\.\/pages\/(.*)\.jsx$/)[1];
	return {
		name,
		path: name === "Home" ? "/" : `/${name.toLowerCase()}`,
		component: pages[path].default,
	};
});

export const App = () => {
	const [count, setCount] = createSignal(0);

	const counts = (Count) => {
		const count = Count();
		return `${count} time${count === 1 ? "" : "s"}`;
	};

	return (
		<>
			<Title>Solid.js & Vite - SSR</Title>
			<LinkMeta rel="shortcut icon" type="image/svg+xml" href={favicon} />
			<nav>
				<ul>
					{routes.map(({ name, path }) => {
						return (
							<li key={path}>
								<Link href={path}>{name}</Link>
							</li>
						);
					})}
				</ul>
			</nav>
			<Routes>
				{routes.map(({ path, component: RouteComp }) => {
					return <Route key={path} path={path} element={<RouteComp />}></Route>;
				})}
			</Routes>
			<div>
				<button onClick={() => setCount(count() + 1)}>Click me</button>
				<p> The Button Has been clicked {counts(count)}</p>
			</div>
			{typeof window}
		</>
	);
};

export default App;

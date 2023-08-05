# _Vite Solid_ SSR

A SSR implementation using [Solid.js](https://solidjs.com/) &
[Vite](https://vitejs.dev/)

## Usage

First get the Repository

```bash
npx degit amoutonbrady/vite-ssr-solid <app-dir>
```

then cd into your app dir

```bash
cd <app-dir>
```

and install the dependencies

```bash
pnpm i
```

### Tips

Use f-mods for minimize CLS caused by custom font. [Resourse for match best result](https://screenspan.net/fallback)

```css
@font-face {
  font-family: 'Adjusted Verdana';
  src: local(Verdana);
  font-weight: 400;
  size-adjust: 92%;
  ascent-override: 78%;
  descent-override: 22%;
  line-gap-override: 11%;
}
```

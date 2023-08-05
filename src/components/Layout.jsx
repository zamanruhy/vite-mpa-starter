// import { Meta } from 'solid-meta'
import Footer from './Footer'
import Header from './Header'

export function Layout(props) {
  return (
    <div class="flex min-h-full flex-col">
      <Header />
      <main class="grow">{props.children}</main>
      <Footer />
    </div>
  )
}

export function Meta() {
  return (
    <>
      <MetaTheme />
      <MetaSocial />
    </>
  )
}

export function MetaSocial() {
  return (
    <>
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Site title" />
      <meta property="og:description" content="Site description" />
      <meta
        property="og:image"
        content="http://via.placeholder.com/1200x630.jpg"
      />
      <meta property="og:url" content="" />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  )
}

export function MetaTheme() {
  return (
    <>
      <meta name="color-scheme" content="light dark" />
      <meta name="theme-color" content="#bbbbbb" />
      <script
        innerHTML={`
          (() => {
            const themeColorEl = document.head.querySelector('meta[name="theme-color"]')
            const colorSchemeEl = document.head.querySelector('meta[name="color-scheme"]')
            const forcedTheme = window.localStorage.getItem('theme')
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            const theme = forcedTheme || (prefersDark ? 'dark' : 'light')
            document.documentElement.classList.toggle('dark', theme === 'dark')
            colorSchemeEl && (colorSchemeEl.content = theme)
            themeColorEl && (themeColorEl.content = theme === 'dark' ? '#333333' : '#bbbbbb')
          })()
        `}
      />
    </>
  )
}

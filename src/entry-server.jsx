import { renderToString } from 'solid-js/web'
// import { renderTags, MetaProvider } from 'solid-meta'
import { Router } from '@solidjs/router'
import App from './App'
import { Meta } from './components/Layout'

export function render(url) {
  // const tags = []
  let body = renderToString(() => (
    <Router url={url}>
      {/* <MetaProvider tags={tags}> */}
      <App />
      {/* </MetaProvider> */}
    </Router>
  ))
  // const head = renderTags(tags).replace(/data-sm=".+?"/g, '')
  let head = renderToString(Meta)
  head = head.replace(/\sdata-sm=".+?"/g, '')
  body = body.replace(/\sdata-hk=".+?"/g, '')
  return { head, body }
}

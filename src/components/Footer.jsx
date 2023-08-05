import { onMount } from 'solid-js'

function script() {
  const el = document.querySelector('[data-footer]')
  if (!el) return

  el.addEventListener('click', (e) => {
    console.log('I am footer el1', el)
  })
}

if (import.meta.env.PROD && !import.meta.env.SSR) {
  script()
}

export default function Footer() {
  onMount(script)
  return (
    <footer class="bg-gray-800" data-footer>
      <div class="container">
        <div class="h-16"></div>
      </div>
    </footer>
  )
}

import { onMount } from 'solid-js'
import { NavLink } from '@solidjs/router'
import logoImg from '../images/logo.svg?datauri&metadata'
import './Header.css'

function script() {
  const el = document.querySelector('[data-header]')
  if (!el) return

  el.addEventListener('click', (e) => {
    console.log('I am header el wwwwwwww fdfsdfas', el)
  })
}

if (import.meta.env.PROD && !import.meta.env.SSR) {
  script()
}

export default function Header() {
  onMount(script)
  return (
    <header class="mb-3 md:mb-5" data-header>
      <div class="container">
        <div class="flex items-center justify-between py-4">
          <img
            class="w-14"
            src={logoImg.src}
            alt="Logo"
            width={logoImg.width}
            height={logoImg.height}
          />
          <ul className="ml-auto flex items-center gap-8">
            <li>
              <NavLink
                end
                href={'/'}
                className="transform border-b-2 py-1 transition"
                activeClass="border-blue-500 text-gray-800"
                inactiveClass="border-transparent text-gray-600 hover:border-blue-500 hover:text-gray-800"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                href={'/about'}
                className="transform border-b-2 py-1 transition"
                activeClass="border-blue-500 text-gray-800"
                inactiveClass="border-transparent text-gray-600 hover:border-blue-500 hover:text-gray-800"
              >
                About
              </NavLink>
            </li>
          </ul>

          <app-hamburger></app-hamburger>
        </div>
      </div>
      <app-drawer className="hidden">
        <app-button variant="primary" data-modal="main-modal">
          Open Modal
        </app-button>
        <app-input
          label="Name"
          placeholder="Type your name"
          name="name"
          autofocus
        ></app-input>
        Lorem <br />
        ipsum <br />
        dolor <br />
        sit <br />
        amet, <br />
        consectetur
        <br />
        adipisicing <br />
        elit. <br />
        Aperiam, <br />
        eveniet!sss
      </app-drawer>
    </header>
  )
}

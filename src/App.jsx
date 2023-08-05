import './styles/base.css'
import './styles/components.css'

import { Route, Routes } from '@solidjs/router'
// import './main.css'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'

import './styles/utilities.css'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/about'} element={<About />} />
      </Routes>
    </Layout>
  )
}

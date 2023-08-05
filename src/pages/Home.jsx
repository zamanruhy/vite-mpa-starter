import { onMount } from 'solid-js'
import HouseIcon from '@/icons/house.svg?component'
import CloseIcon from '@/icons/close.svg?component'
import Image from '@/components/Image'

// import coverImage from '../images/cover.jpeg?width=300;500;700&format=avif;webp;jpg'

import coverImage from '../images/cover.jpeg?width=1000;500;2000&format=webp;jpg'

// import coverWebp from '../images/cover.jpeg?width=1000;500;800&webp&srcset'

// const src = '../images/cover.jpeg'
// const coverImage = import.meta.glob(src, {
//   import: 'default',
//   eager: true,
//   query: { width: '300;500;700', format: 'avif;webp;jpg', metadata: '' }
// })

// let coverImage = {}

// if (import.meta.env.SSR) {
//   coverImage = await import(
//     '../images/cover.jpeg?width=300;500;700&format=avif;webp;jpg'
//   )
// }

function script() {
  // const el = document.querySelector('[data-img]')
  // if (!el) return
  // el.addEventListener('click', (e) => {
  //   console.log('sdfdf', e)
  // })
  // console.log(coverWebp)
}

if (import.meta.env.PROD && !import.meta.env.SSR) {
  script()
}

export default function Home() {
  onMount(script)
  // let coverImage
  // ;(async () =>
  //   (coverImage = await import(
  //     '../images/cover.jpeg?width=300;500;700&format=avif;webp;jpg'
  //   )))()
  // console.log('====IMAGE====', coverImage)
  return (
    <>
      <div class="container">
        <h1 class="mb-3 text-xl">Icons</h1>
        <div class="mt-4 flex items-center gap-4">
          <HouseIcon class="h-7 fill-current" aria-hidden="true" />
          <CloseIcon class="h-7 fill-current" aria-hidden="true" />
        </div>

        <div class="my-5">
          {JSON.stringify(coverImage)}
          <Image
            src={coverImage}
            sizes="100vw sm:50vw md:33vw lg:25vw"
            alt="#"
            loading="lazy"
          />
          {/* {JSON.stringify(coverImage.default)} */}
          {/* <picture>
            <source srcset={coverImage.default[1]} type="image/avif" />
            <source srcset={coverImage[0]} type="image/webp" />
            <img src={coverImage[2]} alt="#" data-img />
          </picture> */}
          {/* <img id="img" src={coverImage + ''} alt="#" data-img /> */}
        </div>
      </div>
    </>
  )
}

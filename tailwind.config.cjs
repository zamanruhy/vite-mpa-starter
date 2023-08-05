const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', 'src/**/*.{js,jsx,ts,tsx,html}'],
  darkMode: 'class',
  theme: {
    // 'container-padding': '15px',
    screens: {
      ...defaultTheme.screens,
      ...Object.keys(defaultTheme.screens)
        .reverse()
        .reduce(
          (acc, key) => ({
            ...acc,
            [`max-${key}`]: {
              raw: `not all and (min-width: ${defaultTheme.screens[key]})`
            }
          }),
          {}
        )
    },
    // colors: {
    //   inherit: colors.inherit,
    //   current: colors.current,
    //   transparent: colors.transparent,
    //   black: colors.black,
    //   white: colors.white
    // },
    // fontSize: {
    //   11: ['11px', { lineHeight: '16px' }],
    // },
    fontFamily: {
      brand: ['OpenSans', 'sans-serif']
    },
    extend: {
      minHeight: defaultTheme.height,
      minWidth: defaultTheme.width,
      zIndex: {
        fixed: 1000,
        // backdrop: 2000,
        modal: 3000,
        popup: 4000
      }
    }
  },
  corePlugins: {
    container: false
  },
  plugins: []
}

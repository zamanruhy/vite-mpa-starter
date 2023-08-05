const useRem = false

module.exports = {
  parser: require('postcss-comment'),
  plugins: [
    require('postcss-import'),
    require('postcss-url')({ url: 'rebase' }),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-functions')({
      functions: {
        linear(v1, v2, w1, w2, unit) {
          if (!['vh', 'vmin', 'vmax'].includes(unit)) {
            unit = 'vw'
          }

          v1 = v1.split(' ').map((v) => parseFloat(v))
          v2 = v2.split(' ').map((v) => parseFloat(v))
          ;[w1, w2] = [w1, w2].map((v) => parseFloat(v))
          const list = []

          for (let i = 0; i < v1.length; i++) {
            const slope = (v2[i] - v1[i]) / (w2 - w1)
            const calc = `calc(${(v1[i] - w1 * slope).toFixed(3)}px + ${(
              100 * slope
            ).toFixed(3)}${unit})`
            list.push(`clamp(${v1[i]}px, ${calc}, ${v2[i]}px)`)
          }

          return list.join(' ')
        }
      }
    }),
    require('tailwindcss/nesting'),
    require('tailwindcss'),
    useRem
      ? require('postcss-pxtorem')({
          propList: ['*'],
          selectorBlackList: [/^html$/]
        })
      : require('postcss-rem-to-pixel')({ propList: ['*'] }),
    require('autoprefixer')
  ]
}

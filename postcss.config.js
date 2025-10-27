module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    'postcss-aspect-ratio-mini': {},
    'postcss-write-svg': { utf8: false },
    'postcss-cssnext': {
      features: {
          customProperties: {
              warnings: false
          }
      }
    }
  },
}

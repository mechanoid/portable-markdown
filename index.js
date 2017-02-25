const path = require('path')

const md2Html = require(path.resolve(__dirname, 'lib', 'md-2-html'))

module.exports = (config) =>
  md2Html(config)
    .then(content => console.log(content))
    .then(() => console.log('finished'))
    .catch(e => {
      if (e.name === 'PortableMarkdownError') {
        console.error('PortableMarkdownError', '::', e.message)
        return
      }

      throw e
    })

const path = require('path')

const md2Html = require(path.resolve(__dirname, 'lib', 'md-2-html'))
const html2Pdf = require(path.resolve(__dirname, 'lib', 'html-2-pdf'))

module.exports = (config, options) =>
  md2Html(config)
    .then(content => html2Pdf(content, config, options))
    .then(() => console.log('finished'))
    .catch(e => {
      if (e.name === 'PortableMarkdownError') {
        console.error('PortableMarkdownError', '::', e.message)
        return
      }
      console.log(e)
      throw e
    })

const path = require('path')
const fs = require('fs-promise')

const HTMLToPDF = require('html5-to-pdf')

const PortableMarkdownError = require('./portable-markdown-error')

module.exports = (html, config, options = {}) => {
  if (!config.target) {
    Promise.reject(new PortableMarkdownError('no target name given'))
  }

  console.log(`writing pdf to ${config.target}`)

  const pdfConfig = Object.assign({}, options, {
    inputBody: html,
    outputPath: config.target
  })

  // html5-to-pdf passes in the actual pdf options as "options"
  pdfConfig.options = options

  const htmlToPDF = new HTMLToPDF(pdfConfig)

  return fs.ensureDir(path.dirname(config.target))
  .then(() => new Promise((resolve, reject) => {
    htmlToPDF.build((e) => {
      if (e) {
        return reject(e)
      }

      return resolve()
    })
  }))
}

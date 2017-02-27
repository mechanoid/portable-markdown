const path = require('path')
const fs = require('fs-promise')

const HTMLToPDF = require('html5-to-pdf')

const PortableMarkdownError = require('./portable-markdown-error')

module.exports = (html, config) => {
  if (!config.target) {
    Promise.reject(new PortableMarkdownError('no target name given'))
  }

  console.log(`writing pdf to ${config.target}`)

  const htmlToPDF = new HTMLToPDF({
    inputBody: html,
    outputPath: config.target
  })

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

const HTMLToPDF = require('html5-to-pdf')

module.exports = (html, config) => {
  console.log(`writing pdf to ${config.target}`)

  const htmlToPDF = new HTMLToPDF({
    inputBody: html,
    outputPath: config.target
  })

  htmlToPDF.build((e) => {
    if (e) {
      return Promise.reject(e)
    }

    return Promise.resolve()
  })
}

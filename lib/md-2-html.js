const path = require('path')
const fs = require('fs-promise')

const PortableMarkdownError = require('./portable-markdown-error')

const md = require('markdown-it')()

  .use(require('markdown-it-include'), __dirname)

  .use(require('markdown-it-regex').default, {
    name: 'pagebreak',
    regex: /(\+\+\+)/,
    replace: (match) => '<hr class="page-break"/>'
  })

module.exports = (config) => new Promise((resolve, reject) => {
  if (!config.entry) {
    reject(new PortableMarkdownError('no entry file given'))
  }

  if (!config.target) {
    reject(new PortableMarkdownError('no target name given'))
  }

  console.log(`reading file from ${config.entry}`)

  const targetFileName = `${config.target}.html`
  const targetDirectory = path.dirname(targetFileName)

  fs.readFile(config.entry)
    // convert entry file content to markdown
    .then((markdown) => md.render(markdown.toString()))

    // ensure target dir and write down converted html
    .then((html) => {
      console.log(`writing file to ${config.entry}`)

      return fs.ensureDir(targetDirectory)
      .then(() => fs.writeFile(targetFileName, html))
      .then(() => html)
    })
    .catch(e => new PortableMarkdownError(e.message))
})

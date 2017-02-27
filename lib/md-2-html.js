const fs = require('fs-promise')

const PortableMarkdownError = require('./portable-markdown-error')

const md = require('markdown-it')()

  .use(require('markdown-it-include'), __dirname)

  .use(require('markdown-it-regex').default, {
    name: 'pagebreak',
    regex: /(\+\+\+)/,
    replace: (match) => '<hr class="page-break"/>'
  })

module.exports = (config) => {
  if (!config.entry) {
    Promise.reject(new PortableMarkdownError('no entry file given'))
  }

  console.log(`reading file from ${config.entry}`)

  return fs.readFile(config.entry)
    // convert entry file content to markdown
    .then(buffer => buffer.toString())
    .then((markdown) => md.render(markdown))
    .catch(e => { throw new PortableMarkdownError(e.message) })
}

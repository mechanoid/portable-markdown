module.exports = function PortableMarkdownError (message, extra) {
  Error.captureStackTrace(this, this.constructor)
  this.name = this.constructor.name
  this.message = message
  this.extra = extra
}

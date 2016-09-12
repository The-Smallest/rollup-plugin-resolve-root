const path = require('path')

function resolveRoot(options) {
  options = options || { }
  var root = options.root
  if (!root)
    throw 'Root not set'
  root = root.trim('/')

  return {
    resolveId(importee, importer) {
      var base = baseDir(importee, importer)
      return base ? path.join(base, importee) : null
    }
  }

  function baseDir(importee, importer) {
    if (!importee)
      return

    if (importee[0] === '/')
      return path.resolve(root)

    if (importer && (importee.startsWith('./') || importee.startsWith('../')))
      return path.dirname(importer)
  }
}

module.exports = resolveRoot
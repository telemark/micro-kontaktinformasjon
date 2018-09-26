const { readFile } = require('fs').promises
const md = require('markdown-it')()
const { json, send } = require('micro')
const isValidFnr = require('is-valid-fodselsnummer')
const NodeCache = require('node-cache')
const lookupKor = require('./lookup-kor')
const lookupDsf = require('./lookup-dsf')
const mapToFint = require('./map-to-fint')
const myCache = new NodeCache({ stdTTL: 3600 })

exports.getFrontpage = async (request, response) => {
  const readme = await readFile('README.md', 'utf-8')
  send(response, 200, md.render(readme))
}

exports.getKontaktinformasjon = async (request, response) => {
  const { fnr } = request.method === 'GET' ? request.params : await json(request)

  try {
    if (fnr && isValidFnr(fnr)) {
      const cachedInfo = myCache.get(fnr)
      if (cachedInfo) {
        send(response, 200, cachedInfo)
      } else {
        const [kor, dsf] = await Promise.all([lookupKor(fnr), lookupDsf(fnr)])
        const kontaktinformasjon = mapToFint(Object.assign({}, dsf, kor))
        myCache.set(fnr, kontaktinformasjon)
        send(response, 200, kontaktinformasjon)
      }
    }
  } catch (error) {
    send(response, 400, error.message)
  }
}

const { readFile } = require('fs').promises
const md = require('markdown-it')()
const { json, send } = require('micro')
const lookupKor = require('./lookup-kor')
const lookupDsf = require('./lookup-dsf')

exports.getFrontpage = async (request, response) => {
  const readme = await readFile('README.md', 'utf-8')
  send(response, 200, md.render(readme))
}

exports.getKontaktinformasjon = async (request, response) => {
  const { fnr } = request.method === 'GET' ? request.params : await json(request)
  const [kor, dsf] = await Promise.all([lookupKor(fnr), lookupDsf(fnr)])
  console.log(kor)
  console.log(dsf)
  send(response, 200, Object.assign({}, dsf, kor))
}

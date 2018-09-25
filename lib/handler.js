const { readFile } = require('fs').promises
const md = require('markdown-it')()
const { json, send } = require('micro')

exports.getFrontpage = async (request, response) => {
  const readme = await readFile('README.md', 'utf-8')
  send(response, 200, md.render(readme))
}

exports.getKontaktinformasjon = async (request, response) => {
  const { fnr } = request.method === 'GET' ? request.params : await json(request)
  send(response, 200, fnr)
}

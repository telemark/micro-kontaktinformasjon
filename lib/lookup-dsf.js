const normalizeContact = require('tfk-dsf-normalize-contact')
const config = require('../config')
const getData = require('./get-data')

function isBosatt (person) {
  return person['STAT-KD'].toString() === '1'
}

function isAvailable (person) {
  const validStats = ['0']
  return validStats.includes(person['SPES-KD'].toString())
}

module.exports = personalId => {
  return new Promise(async (resolve, reject) => {
    let dsfData = false
    const options = {
      url: `${config.DSF_SERVICE_URL}/hentDetaljer`,
      secret: config.DSF_JWT_SECRET,
      payload: {
        saksref: 'micro-kontaktinformasjon',
        foedselsnr: personalId
      }
    }
    dsfData = await getData(options)

    if (dsfData !== false) {
      const person = dsfData.RESULT && dsfData.RESULT.HOV ? dsfData.RESULT.HOV : false
      const dsfContactNormalized = person && isBosatt(person) && isAvailable(person) ? normalizeContact(person) : {}
      return resolve(dsfContactNormalized)
    } else {
      return reject(new Error('DSF lookup failed'))
    }
  })
}

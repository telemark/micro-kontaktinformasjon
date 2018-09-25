const unwrapContact = require('tfk-dsf-unwrap-contact')
const normalizeContact = require('tfk-dsf-normalize-contact')
const config = require('../config')
const getData = require('./get-data')

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
      const dsfContact = unwrapContact(dsfData)
      const dsfContactNormalized = normalizeContact(dsfContact)
      return resolve(dsfContactNormalized)
    } else {
      return reject(new Error('DSF lookup failed'))
    }
  })
}

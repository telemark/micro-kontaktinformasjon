process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const config = require('../config')
const getData = require('./get-data')

module.exports = async personalId => {
  const options = {
    url: config.KOR_SERVICE_URL,
    secret: config.KOR_JWT_SECRET,
    payload: [personalId]
  }
  try {
    const data = await getData(options)
    const person = data.personer[0]
    if (person.reservasjon === 'NEI' && person.status === 'AKTIV' && person.kontaktinformasjon) {
      return {
        epostadresse: person.kontaktinformasjon.epostadresse || false,
        mobiltelefonnummer: person.kontaktinformasjon.mobiltelefonnummer || false
      }
    } else {
      return {}
    }
  } catch (error) {
    throw error
  }
}

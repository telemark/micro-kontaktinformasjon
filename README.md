[![Build Status](https://travis-ci.org/telemark/micro-kontaktinformasjon.svg?branch=master)](https://travis-ci.org/telemark/avtale-logg)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# micro-kontaktinformasjon

Microservice for looking up official contact information from Det sentrale folkeregisteret and Kontakt- og reservasjonsregisteret.

## API

All calls must supply a valid jwt

### ```GET /kontaktinformasjon/:fnr```

**fnr** Official Norwegian personal id-number

### ```POST /kontaktinformasjon

```JavaScript
{
  fnr: '<Official Norwegian personal id-number>'
}
```

### Returns

```JavaScript
{
  fødselsnummer: '18117139876',
  fødselsdato: '1971-11-18',
  navn: 'Gandalf Grå',
  fornavn: 'Gandalf',
  mellomnavn: '',
  etternavn: 'Grå',
  adresselinje: 'Konglevegen 24',
  postnummer: '1732',
  poststed: 'Høtten',
  epostadresse: 'gandis@wizmail.com',
  mobiltelefonnummer: '39779339'
}
```

## Related

- [micro-dsf2](https://github.com/telemark/micro-dsf2) microservice for dsf
- [micro-kor](https://github.com/telemark/micro-kor) microservice for kontakt- og reservasjonsregisteret

## License

[MIT](LICENSE)
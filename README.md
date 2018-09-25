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

## License

[MIT](LICENSE)
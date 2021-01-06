var express = require('express')
var router = express.Router()

var cognito = require('../services/cognito_service')

router.get('/register', function (req, res, next) {
    cognito.REGISTER(req, res, next)
})

router.get('/login', function (req, res, next) {
    cognito.LOGIN(req, res, next)
})

router.get('/logout', function (req, res, next) {
    cognito.LOGOUT(req, res, next)
})

router.get('/renew', function (req, res, next) {
    var UserData = {
        UserName: 'micko',
        RefreshToken: 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.Ly_wxJtvNgW3r9VfGV9Ud64Ay3j4ZO2DysLHTCfl5SQK0JhfXpgTNGlkKK6ZnXTUtCf6KP9eFbbVQcshJeZbA286IC6RVpcwrpJGnWQ5yc0l1lvjdSwcxEKiUBEkvqNcB5Dr5KKX7x2HmgU37uK1lx9FLkf2iZpYwM3-xN2M-NqZAdFUU-tpVk8bLhFp-XRkF5OeD3pvtOl9HC-krGZ-NjaZtnXbEHXje1vs_TOvpDcwFilMwsEgp5B-emQ8vP1lJ8r_NhlBNKwnHWmZgUJ6gbHN7hP6ZX2xLNswAjtht6b9ZNrPKbADzbTtIvu4wHrhUNlUsCFVUgzo7W73unnkhg.jCCaZp862IhNaVfP.hJoS6AFpG1TlL4TJfGoeeFW1-ZFRl97x0_anF7Z66BHW882FDQml175k53mLC41yaZgRJS9rECP1AQacRhA0xLQGtuLu4lTHTIPD_Ernn697Kljj4zqMkafZSdc3boWNgFKA7hoz-n5Tus-P68hvtYPwcDZNpyooWGZ69abgbY0qpjJ8tL26imF8eCMMKDPc7dQF6h34I7y6uZQEYFRUU9VS_3WDHxc3lSEjgh1H0-fgq8-3Ggr5CHXsavWczCL1UiZE27uc89E9z7XSfVKv1VLrEd3UUKvja7L5L0ZEnAxWSaCnouZ1Hp8pfzfG0edT-GpRHK5cjcwoxf_7bTJZmsPeLPLtjRuhBYjzQ5l3cZG3xGM7yNZhn6RkEdldCvuBohLnStPpiFmbZP0A3qucFcadsGFgVRzHB_in6wkHyZU9PrXL4i4NVaTJIY5uLtFkQ8XyHCWQ68CKpxc2pma8VHz_hl9BUqdrKq67mPoJ7_9TQmhstD4TVtpK2FA0GmxTdZMoGTIR3K4cROpWrQ32DamCSpv2uf12UCXBstdEWQFKfRrF5IZUPMGorJblnlsJYwNLPvUeHzhzP3sMXQKtHVM0HM6ecQ7LuVb3TW6PsZUH7PN6eL3znh4s-HXMv5fQIPABp4Zwfdoo5Mu6-dNpmTKHF_CYDe0x-8mZQRCFWQMmAGm00YGny8E8mJTNgZ2wIcPkE9FofNpr3_9tdX4r3wb47gSZEX-hoX3Tp78cA25IyYr75PNG4QK1swcGvSLOgYk0vSYNakHubMHuIPpE3PhUtb2BD8hNCzgvJrlgOM9_wv0kLPAPmTKYGJRZuMpn13WHkLELCwzd_HaYe7gO4XoTTbUCQ62779v1jysoCizGd0IOWMhQWD6QwAKx7qDLozeTuwgD5u04RpJOySe6a80dXvIbE64iHEWp1hod7N9ps5pWptGNIAbrThOR1u-UeMcyi43CyAFTpyMwHhYwLWDKAhAjFpvOf4V6HIV47qOu18wp6oipm4LTpl9-66_P94jo3YplbhIum9oRaUq1SVGsCuWoyoMURcj93QH0BR1GA1sqs9asECYLJuhhti9bv6QFHqrmCACQFJFoKY7FVWZzUUDFyglFUNsSQpQ4XRFWRHBTnJJ4t3ODCMPLT9cirgvMZt_DqlACpLluiunYpMsaamZWCIN1Bmu12NbCOHrYP8GXb3jHMeshb_w5H2Awmzxm5FexlZ8cdd4SzP7bnIvd8z8La2ooXOuUXL6knflwOcNNiyCPQ-rp3jBxEiONBjYri4oJVoZYaUuufIXKLg.B0JdtpDkc0o2gFEvgJb2tA'
    }
    cognito.RENEW(req, res, next, UserData)
})

router.get('/forgot', function (req, res, next) {
    var UserData = {
        UserName: 'micko'
    }
    cognito.FORGOT_PASSWORD(req, res, next, UserData)
})

router.get('/confirm', function (req, res, next) {
    var UserData = {
        UserName: 'micko',
        VerificationCode: '838073',
        NewPassword: 'P@55w0rd12345678'
    }
    cognito.CONFIRM_PASSWORD(req, res, next, UserData)
})

module.exports = router
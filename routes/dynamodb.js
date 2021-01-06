var express = require('express')
var router = express.Router()

var dynamo = require('../services/dynamodb_service')

router.post('/create', function (req, res, next) {
    dynamo.CREATE(req, res, next)
});

router.get('/read', function (req, res, next) {
    dynamo.READ(req, res, next)
})

router.post('/update', function (req, res, next) {
    dynamo.UPDATE(req, res, next)
})

router.post('/delete', function (req, res, next) {
    dynamo.DELETE(req, res, next)
})

module.exports = router;

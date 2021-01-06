var express = require('express')
var router = express.Router()

var mysql = require('../services/mysql_service')

router.get('/test', function (req, res, next) {
    mysql.TEST(req, res, next)
})

router.post('/create', function (req, res, next) {
    mysql.CREATE(req, res, next)
})

router.get('/read', function (req, res, next) {
    mysql.READ(req, res, next)
})

router.post('/update', function (req, res, next) {
    mysql.UPDATE(req, res, next)
})

router.post('/delete', function (req, res, next) {
    mysql.DELETE(req, res, next)
})

module.exports = router
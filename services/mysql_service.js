var mysql = require('mysql')

var config = require('../config/config')

var con = mysql.createConnection({
    host: config.Mysql.Host,
    user: config.Mysql.User,
    password: config.Mysql.Password,
    database: config.Mysql.Database
})

exports.TEST = function (req, res, next) {
    con.connect(function (err) {
        if (err) {
            res.status(500)
            res.json({
                msg: 'Error establishing connection. Error: ' + err
            })
            throw err
        } else {
            console.log('Connected to Mysql at host:', config.Mysql.Host)
            res.json({
                msg: 'Connection established.'
            })
        }

    })
}


exports.CREATE = function (req, res, next) {
    res.json({
        msg: 'Create'
    })
}

exports.READ = function (req, res, next) {
    res.json({
        msg: 'Read'
    })
}

exports.UPDATE = function (req, res, next) {
    res.json({
        msg: 'Update'
    })
}

exports.DELETE = function (req, res, next) {
    res.json({
        msg: 'Delete'
    })
}
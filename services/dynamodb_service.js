var AWS = require('aws-sdk')
var moment = require('moment')
var config = require('../config/config')

AWS.config.update({
    accessKeyId: config.Dynamodb.Access_Key,
    secretAccessKey: config.Dynamodb.Secret_Access_Key,
    region: config.Dynamodb.Region,
    endpoint: config.Dynamodb.Endpoint
})

var docClient = new AWS.DynamoDB.DocumentClient()
var table = 'Books'
// Table consists of:
// book_id - partition key
// book_name 
// register_date

exports.CREATE = function (req, res, next) {
    var params = {
        TableName: table,
        Item: {
            'book_id': moment().unix().toString(),
            'book_name': req.body.book_name,
            'register_date': new Date().toLocaleDateString(),
        }
    }

    docClient.put(params, function (err, data) {
        if (err) {
            console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
            res.status(500)
            res.json({
                msg: 'Unable to add item. Error JSON: ' + JSON.stringify(err, null, 2)
            })
        } else {
            // console.log(data) // does not work
            console.log('Added book:', params.Item)
            res.json({
                msg: 'Success'
            })
        }
    })
}

//get an item by book_id
exports.READ = function (req, res, next) {
    var params = {
        TableName: table,
        Key: {
            'book_id': req.query.book_id
        }
    }

    docClient.get(params, function (err, data) {
        if (err) {
            console.error('Unable to read item. Error JSON:', JSON.stringify(err, null, 2))
            res.status(500)
            res.json({
                msg: 'Unable to read item. Error JSON: ' + JSON.stringify(err, null, 2)
            })
        } else {
            console.log('Data retrieved:', data)
            res.json(data)
        }
    })
}

exports.UPDATE = function (req, res, next) {
    var params = {
        TableName: table,
        Key: {
            'book_id': req.body.book_id
        },
        UpdateExpression: 'set book_name = :bn',
        ExpressionAttributeValues: {
            ':bn': req.body.book_name
        },
        ReturnValues: 'UPDATED_NEW'
    }

    docClient.update(params, function (err, data) {
        if (err) {
            console.error('Unable to update item. Error JSON:', JSON.stringify(err, null, 2))
            res.status(500)
            res.json({
                msg: 'Unable to update item. Error JSON: ' + JSON.stringify(err, null, 2)
            })
        } else {
            console.log('Updated item:' + data.Attributes)
            res.json({
                msg: 'Success. -----> Updated item: ' + data.Attributes.book_name
            })
        }
    })
}

exports.DELETE = function (req, res, next) {
    var params = {
        TableName: table,
        Key: {
            'book_id': req.body.book_id
        }
    }

    docClient.delete(params, function (err, data) {
        if (err) {
            console.error('Unable to delete item. Error JSON:', JSON.stringify(err, null, 2))
            res.status(500)
            res.json({
                msg: 'Unable to delete item. Error JSON: ' + JSON.stringify(err, null, 2)
            })
        } else {
            console.log('Deleted item:', req.body.book_id)
            res.json({
                msg: 'Success. -----> Deleted item:' + req.body.book_id
            })
        }
    })
}
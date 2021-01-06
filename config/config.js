require("dotenv").config()

exports.Dynamodb = {
    'Access_Key': process.env.Access_Key,
    'Secret_Access_Key': process.env.Secret_Access_Key,
    'Region': process.env.Region,
    'Endpoint': 'https://dynamodb.' + process.env.Region + '.amazonaws.com'
}

exports.Mysql = {
    'Host': process.env.Host,
    'User': process.env.User,
    'Password': process.env.Password
}

exports.Cognito = {
    'Pool_ID': process.env.Pool_ID,
    'Client_ID': process.env.Client_ID,
    'Pool_Region': process.env.Pool_Region
}
const AmazonCognitoIdentity = require('amazon-cognito-identity-js')
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool
const AWS = require('request')
const jwkToPem = require('jwk-to-pem')
const jwt = require('jsonwebtoken')
global.fetch = require('node-fetch')

var config = require('../config/config')

const poolData = {
    UserPoolId: config.Cognito.Pool_ID,
    ClientId: config.Cognito.Client_ID
}
const pool_Region = config.Cognito.Pool_Region

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)

exports.REGISTER = function (req, res, next) {
    var attributeList = []
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: 'name',
        Value: 'Micko Silvestre'
    }))
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: 'gender',
        Value: 'male'
    }))
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: 'birthdate',
        Value: '1995-09-18'
    }))
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: 'address',
        Value: '#540 Libis Kaliwa Duhat, Bocaue, Bulacan'
    }))
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: 'email',
        Value: 'mckslvstr@gmail.com'
    }))
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: 'phone_number',
        Value: '+639777778301'
    }))
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: 'custom:custom_var',
        Value: 'custom value'
    }))

    userPool.signUp('micko', 'P@55w0rd123', attributeList, null, function (err, result) {
        if (err) {
            console.error('Error:', err)
            res.json({
                msg: 'Error: ' + err.message
            })
        } else {
            console.log('Sucess!')
            cognitoUser = result.user;
            console.log('user name is ' + cognitoUser.getUsername());
            res.json({
                msg: 'Success'
            })
        }
    })
}

exports.LOGIN = function (req, res, next) {

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: 'micko',
        Password: 'P@55w0rd12345678'
    })

    var userData = {
        Username: 'micko',
        Pool: userPool
    }

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('Access token:', result.getAccessToken().getJwtToken())
            console.log('Id token:', result.getIdToken().getJwtToken())
            console.log('Refresh token:', result.getRefreshToken().getToken())
            res.json({
                AT: result.getAccessToken().getJwtToken(),
                IT: result.getIdToken().getJwtToken(),
                RT: result.getRefreshToken().getToken()
            })
        },
        onFailure: function (err) {
            console.error('Error:', err)
            res.json({
                msg: 'Error: ' + err.message
            })
        }
    })

}

exports.UPDATE = function (req, res, next) {
    var attributeList = []
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: 'name',
        Value: 'Judge Micko S. Silvestre'
    }))

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: 'micko',
        Password: 'P@55w0rd123'
    })

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)

    cognitoUser.updateAttributes(attributeList, (err, result) => {
        if (err) {
            console.error('Error:', err)
            res.json({
                msg: 'Error: ' + err.message
            })
        } else {
            console.log(result)
            res.json({
                msg: 'Success'
            })
        }
    })
}

exports.RENEW = function (req, res, next, UserData) {
    const userData = {
        Username: UserData.UserName,
        Pool: userPool
    }

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
    const RefreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({ RefreshToken: UserData.RefreshToken })

    cognitoUser.refreshSession(RefreshToken, (err, session) => {
        if (err) {
            console.log(err);
            res.json({
                msg: 'Error: ' + err.message
            })
        } else {
            let retObj = {
                "access_token": session.accessToken.jwtToken,
                "id_token": session.idToken.jwtToken,
                "refresh_token": session.refreshToken.token,
            }
            console.log(retObj)
            res.json({
                msg: 'Success'
            })
        }
    })
}

exports.FORGOT_PASSWORD = function (req, res, next, UserData) {
    cognitoUser = new AmazonCognitoIdentity.CognitoUser({
        Username: UserData.UserName,
        Pool: userPool
    })

    cognitoUser.forgotPassword({
        onSuccess: function (data) {
            console.log('CodeDeliveryData from forgotPassword')
            res.json({
                msg: 'Success',
                data: data,
            })
        },
        onFailure: function (err) {
            console.log('Error:', err.message)
            res.json({
                msg: 'Error: ' + err.message
            })
        },
    })
}

exports.CONFIRM_PASSWORD = function (req, res, next, UserData) {
    cognitoUser = new AmazonCognitoIdentity.CognitoUser({
        Username: UserData.UserName,
        Pool: userPool
    })

    cognitoUser.confirmPassword(UserData.VerificationCode, UserData.NewPassword, {
        onSuccess() {
            console.log('success')
            res.json({
                msg: 'Success'
            })
        },
        onFailure(err) {
            console.log('Error:', err.message)
            res.json({
                msg: 'Error: ' + err.message
            })
        },
    })
}
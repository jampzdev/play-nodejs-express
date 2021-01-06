# Nodejs with Express
This API  is a startup api using nodejs with express.

Features:
* RESTful endpoints.
* Application configuration via environment variable and configuration file.
* CRUD endpoints using dynamodb.
* CRUD endpoints using mysql.
* Authentication using API Gateway and Cognito.
* User management using Cognito and Dynamodb.

## Getting Started

1. Install nvm. Follow this link: https://github.com/nvm-sh/nvm.
2. Use nvm to install node.
3. Install nodemon. Follow this link: https://www.npmjs.com/package/nodemon.
4. Cd to the project folder and create a .env file. Input the following values:

```shell
Access_Key = [your_access_key]
Secret_Access_Key = [your_secret_access_key]
Region = [dynamo_db_region]

Host = [your_host]
User = [your_user]
Password = [your_password]
Database = [database_name]

Pool_ID = [your_cognito_user_pool]
Client_ID = [your_app_client_id]
Pool_Region = [your_pool_region]
```

After installing node and nodemon, run the following commands.
```shell
# install dependencies
$ npm install
# run the project
$ nodemon
```
This will install all dependencies and run the project. The project will run at port 3000 by default.

## Mysql
* This project assumes you have mysql installed in your computer.

Sign in to mysql in your terminal using this command.
```shell
$ mysql -u [your_user] -p
```
After a successful sign in, run the following commands.
```shell
mysql> create database play;
mysql> use play;
mysql> create table books (
mysql> book_id bigint primary key,
mysql> book_name varchar(255) not null,
mysql> register_date date
mysql> );
```
This will create a database named play and a table named books.

Running a get request to /mysql/test should give you the following output.
```shell
{
    msg: "Connection established."
}
```

* This project assumes you have an AWS account of at least free tier eligibility.

## Cognito
1. Create a user pool by going to cognito service and clicking manage user pools. Click create user pool and choose step through settings.
2. Enter your preferred name and select the fields (attributes) you want your user pool to have.
3. Click next step til you reach Message Customizations. For the verification type, choose link instead of code.
4. Click next step til you reach App clients. Create an app client. Untick Generate client secret if it is selected.
5. Enter preferred name and click create app client.
6. Click next step til you reach Review section and click create pool.

* Take note of the app client ID and the Pool ID. 
* You could always go back to your user pool and click general settings to see the Pool ID and App Clients to see your App client ID.


The following sections will let you insert newly registered and verified users from your user pool to your dynamodb table.

## IAM
1. Go to IAM service and click roles.
2. Click create role and choose lambda then click next permissions.
3. Choose the following as the role's policy: AmazonDynamoDBFullAccess, AmazonCognitoDeveloperAuthenticatedIdentities, AmazonCognitoPowerUser.
4. Optionally you could create a tag. 
5. Click next til you get to the review section and enter your preferred name then click create role.

## Lambda
1. Go to Lambda service and click create function.
2. Enter preferred function name and choose node.js 10.x as your runtime.
3. For the permissions, choose use an existing role and select your newly created role. Then click create function.
4. Copy the code found in /lambda/index.js to your newly created lambda function. Modify the parameters to match your dynamodb talbe scheme.
5. Create environment variables. Use REGION as key for your dynamodb region and TABLE_NAME for your table name.
6. Configure a test event by clicking configure test event (Upper right. Beside Test button.).
7. Copy the code found in /lambda/test and modify to match your dynamodb table scheme.
8. Click Test and you should be able to see a success message and your data added to your dynamodb table.

* Last thing to do is to link your lambda function to your cognito triggers.

## Lambda - Cognito
1. Go back to your cognito user pool and click triggers from the menu.
2. Go to post confirmation section and you should be able to see and select your lambda function from the dropdown.
3. Click save changes.

* Now, when a user on your cognito user pool is verified, it will automatically be inserted to your dynamodb table.

## API Gateway
* Using cognito user pool to authorize our api calls.

1. Go to API Gateway service and click create API.
2. Select REST and New API (selected by default).
3. Enter preferred name and choose Edge Optimized as your endpoint type.
4. From the actions dropdown, click create resource.
5. Enter preferred name and tick Enable API Gateway CORS.
6. With your newly created resource selected, from the actions dropdown, click create method.
7. Choose the http protocol needed and click the check button besides it.
8. Choose HTTP for integration type.
9. Enter your API endpoint on the Endpoint URL. This url will be called upon successful authorization. 
10. Click save.
11. Click Authorizers from the menu and create a new authorizer.
12. Enter preferred name and choose your cognito user pool.
13. Enter Authorization for the Token Source.
14. With your newly created method selected, click on Method Request.
15. Select your newly created authroizer on the Authorization setting by clicking the pencil icon beside it.
16. Optionally, you could write your parameters on the URL Query String Parameters (GET Requests) and Request Body (POST Requests) section if your endpoint needs parameters.
17. From the Actions dropdown menu, click Enable CORS.
18. Make sure you have the right headers and methods.
19. On the advanced section, under Access-Control-Allow-Credentials, enter 'true'. This will allow CORS when using credentials.
20. From the Actions drowdown menu, click deploy API. This will prompt us to either create a stage or choose an existing one.
21. Upon choosing an existing stage or creating a new one, under the stage section, you'll be given an invoke url. This is the url you will use to access your api gateway.

* The format would be [invoke_url]/[your_resource]
* Each time you make a change, you need to redeploy your api for the changes to be applied.
* To test, make a request to your api gateway and pass the ID token, you get this upon signing in, thru your header with Authorization as key.
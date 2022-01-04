# Security App

A simple app for authentication and authorization of user <br/>
App is responsible for authenticate and login users, validating whether logged user is permitted to do specific action or not, and loggin users out from the system <br/>
This is a Node (Express) app written with typescript. Sqlite is used as a DB and redis for caching 

## Description

When user logs in the system, access token and refresh token are sent back to the client. The access token expiration time is only 10 mins while the refresh token is valid for 1 year. When the access token is expired, client has to send the refresh token to get back a new access token. <br/>
Refresh tokens are stored in a caching system (redis) as key value pairs where the key is user id and value is the refresh token. When a user logs out or session needs to be invalidated, refresh token has to be removed from redis so that the user is forced to login to the application again. <br/>
With regards to authentication, a table called action stores action names, and has many to many relationship with user which means that every user can have multiple actions and vice versa. When a user asks to perform action, request should be send to verify that user has the permission to perform the action. <br/> 

## Installation

Clone the Github repository and use npm to install dependencies at the server folder <br/>
```
$ git clone https://github.com/Zomaldinho/secuirty.git
$ cd server
$ npm install
```
After installation make sure you have the `.env` file in the server folder then run `$ npm start` to start the server at port 3000 and make sure that the following message are shown in the terminal `Server is listening on port 3000`. if not, restart the server by pressing CTRL+C and `$ npm start` again. <br/>


## Usage
This app has 8 endpoints user to authenticate and authorize users, you can use them as following :- <br/>
* **Register Endpoint** : `POST /register/` used for creating a user
  #### Request Body Params
     name: string, <br/>
     email: string, (should be unique)<br/>
     password: string, (min 6 chars) <br/>
  #### Response
    {
      message: "user is registered. please login"
    }

* **Login Endpoint** : `POST /login/` used for loggin in a user
  #### Request Body Params
     email: string, <br/>
     password: string, (min 6 chars) <br/>
  #### Response
    {
      accessToken: string, 
      refreshToken: string
    }

* **Refresh Token Endpoint** : `POST /refresh-token/` used to refresh access token when it expires
  #### Request Body Params
     accessToken: string, <br/>
  #### Response
    {
      accessToken: string, 
      refreshToken: string
    }

* **Logout Endpoint** : `POST /logout/` used to logout user 
  #### Request Body Params
     accessToken: string, <br/>
  #### Response
    { message: 'user is logged out' }

* **Invalidate Endpoint** : `POST /invalidate/` used to logout user 
  #### Request Body Params
     userId: number, <br/>
  #### Response
    { message: 'session is invalidated' }

* **Validate Action Endpoint** : `POST /validate-action/` used to validate if user can perform an action or not
  #### Request Body Params
     actionName: string, <br/>
  #### Headers
     Authorization: 'Bearer ' + accessToken <br/>
  #### Response
    { isAuthorized: bolean }

* **Add Action Endpoint** : `POST /add-action/` used to add a new action to Actions table
  #### Request Body Params
     actionName: string, <br/>
  #### Headers
     Authorization: 'Bearer ' + accessToken <br/>
  #### Response
    { message: 'action is created' }

* **Add User Action Endpoint** : `POST /add-user-action/` used to add an action to a specific user table
  #### Request Body Params
     actionName: string, <br/>
     userId: number, <br/>
  #### Headers
     Authorization: 'Bearer ' + accessToken <br/>
  #### Response
    { message: 'user action is created' }

<br/>

### Models
2 models are used to store data
* **User model** : in which users are stored and it has the following properties:<br/> 
  =>**name**, **email**, and **password** (encrypted) which are the main data of a user, <br/>
  =>**createdAt**, **updatedAt** (timestamp). <br/>
* **Action model** : in which Action data are stored and it has the following property:<br/> 
  => **name** which is the name of the action the user can perform <br/>
* Both tables has many to many relationship which means that user can have multiple actions ans action can be assigned to multiple users


## Middlewares 

* **isLoggedIn**: checks if the request has jwt in the header and it corresponds to an existed user. if now jwt or no user, it sends error to client.
* **ReqBodyValidator**: validate that the request body has the required params and if not responds with error message.
* **ErrorHandler**: catches any error that may happen in any route and sends back error message to the client.

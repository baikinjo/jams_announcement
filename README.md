## Installation
* * *
### On Windows
 Install Visual Studio Builds Tools (C++) and Python. If not installed, node-gyp rebuild fails when installing this project.

    npm i -g windows-build-tools

 Set enviornment variable like following:

    npm config set python python2.7

    npm config set msvs_version 2015

 Finally, install the project

    npm i

### MongoDB
  1. Install MongoDB, https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
  2. path/to/mongo/bin/mongorestore.exe path/to/dump
    - Ask for a MongoDB backup dump that you can work with
    - [optional] You can set up enviornment variable for Mongo excutables.

## Running Project
* * *
### Development
    npm run dev
### Production
    npm start

## Using REST Client
 First you need to recieve JWT Token by signing in

    Post: http://localhost:3000/users/signin
    JSON: {
        "username": your_email, 
        "passoword": your_password
    }

And then, you can do AJAX calls with that token

   {
       Header: {
           Authorization: [token]
       }
   }

## HTTP Code
* * *
 **200**: Successfully delivered

 **201**: Respond with new token

 **403**: Dependency error

## Commit Messages
* * *
 **feat**: New feature for the user, not a new feature for build script
 
 **fix**: Bug fix for the user, not a fix to a build script
 
 **docs**: Changes to the documentation

 **style**: Formatting, missing semi colons, etc; no production code change

 **refactor**: Refactoring production code, eg. renaming a variable

 **test**: Adding missing tests, refactoring tests; no production code change

 **chore**: Updating grunt tasks etc; no production code change



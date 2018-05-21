## Passport
* * *
1. When the user signs in, our API creates a JWT token and returns it in response
2. Our frontend saves the token in localStorage and sends it back in every requests that needs authentication
3. All requests needing authentication pass through a middleware that checks the provided token and allows the request only if the token is verified
 
 Refer to this blog for more information, https://jonathas.com/token-based-authentication-in-nodejs-with-passport-jwt-and-bcrypt/
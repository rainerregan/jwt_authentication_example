# JSON Web Token (JWT) Example using Node.js

This repository contains an example implementation of JSON Web Token (JWT) authentication in Node.js. It demonstrates how to generate and verify JWT tokens using the `jsonwebtoken` library in Node.js.

## Installation
To install the dependencies, run the following command in the project directory:

```sh
npm install
```
Setup the MongoDB URL on `.env` file

## Usage
To start the server, run the following command:

```sh
npm start
```
This will start the server at `http://localhost:3000`

### Register 
To register user into the database, send a POST request to the `/register` endpoint with the following payload:

```js
{
  "username": "testuser",
  "password": "testpassword",
  "email": "testemail@example.com"
}
```

The server will register user and the credential can now be used to login and get the access token.

### Login
To generate a JWT token, send a POST request to the /login endpoint with the following payload:

```js
{
  "username": "testuser",
  "password": "testpassword"
}
```

The server will respond with a JWT token, which can be used to authenticate subsequent requests.

To authenticate a request, include the JWT token in the Authorization header of the request, like so:

```sh
Authorization: Basic <token>
```

The server will verify the JWT token and, if it is valid, allow the request to proceed.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
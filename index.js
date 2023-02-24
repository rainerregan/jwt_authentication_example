import express from 'express';
import mongoose, { mongo } from 'mongoose';
import dbConfig from './config/db.config';
import { unless } from 'express-unless';
import * as dotenv from 'dotenv';

import auth from './middlewares/auth.js';
import errors from './middlewares/errors.js';
import userRoutes from './routes/user.routes.js';

// Express App
const app = express();

// Setup dotenv
dotenv.config();

// Set Mongo as Global
mongoose.Promise = global.Promise;

// Connect to mongoDB database from the config
mongoose.connect(dbConfig.db, {
  useNewUrlParser: true, // Using a new URL parser
  useUnifiedTopology: true 
}).then(
  () => {
    console.log('Database connected');
  },
  (error) => {
    console.log(`Database can't be connected: ${error}`);
  }
);

// Check if the user has the auth token.
// Binding unless to the authentication token middleware.
// If the user does not have a token, it will show unauthorize response
auth.authenticateToken.unless = unless;

// Using unless so we can bypass the token middleware, and allowing user to access the page listed below.
app.use(
  // If the user does not has the token, system will redirect the user to the guest page.
  // These pages does not require any token.
  // Login and register page doesnot require any token to access.
  auth.authenticateToken.unless({
    path: [
      { url: "/users/login", methods: ["POST"] }, // Login will create a token for user
      { url: "/users/register", methods: ["POST"] },
    ]
  })
);

// Using json as the body parser
app.use(express.json());

// Routes Middleware
app.use("/users", userRoutes);

app.use(errors.errorHandler);

// Starting the server
app.listen(process.env.port || 4000, () => {
  console.log(`Server started at ${process.env.url}:${process.env.port}`);
})
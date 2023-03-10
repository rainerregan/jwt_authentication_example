import express from 'express';
import mongoose, { mongo } from 'mongoose';
import dbConfig from './config/db.config.js';
import { unless } from 'express-unless';
import * as dotenv from 'dotenv';

import { authenticateToken } from './middlewares/auth.js';
import { errorHandler } from './middlewares/errors.js';
import userRoutes from './routes/user.routes.js';

// Express App
const app = express();

// Setup dotenv
dotenv.config();

// Set Mongo promise as Global promise
mongoose.Promise = global.Promise;

// Connect to mongoDB database based on the data from the configuration file
mongoose.connect(dbConfig.db, {
  useNewUrlParser: true, // Using a new URL parser
  useUnifiedTopology: true
}).then(
  () => {
    // if the connection is successful
    console.log('Database connected');
  },
  (error) => {
    console.log(`Database can't be connected: ${error}`);
  }
);

// Check if the user has the auth token.
// Binding unless to the authentication token middleware.
// If the user does not have a token, it will show unauthorize response
authenticateToken.unless = unless;

// Using unless so we can bypass the token middleware, and allowing user to access the page listed below.
app.use(
  // If the user does not has the token, system will redirect the user to the guest page.
  // These pages does not require any token.
  // Login and register page doesnot require any token to access.
  authenticateToken.unless({
    path: [
      { url: "/users/login", methods: ["POST"] }, // Login will create a token for user
      { url: "/users/register", methods: ["POST"] },
    ]
  })
);

// MIDDLEWARES
// ===========
// Using json as the body parser
app.use(express.json());

// Routes Middleware
app.use("/users", userRoutes);

// Using Error Handler middleware
app.use(errorHandler);

// Starting the server
app.listen(process.env.port || 4000, () => {
  console.log(`Server started at ${process.env.url}:${process.env.port}`);
})
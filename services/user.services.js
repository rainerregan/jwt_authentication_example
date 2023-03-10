import bcryptjs from 'bcryptjs';
import User from "../models/user.model.js";
import { generateAccessToken, authenticateToken } from '../middlewares/auth.js'

/**
 * Service for login. Matching therequest with the database
 * @param {*} param0 
 * @param {*} callback 
 * @returns 
 */
const login = async ({ username, password }, callback) => {
  const user = await User.findOne({ username });

  // Check if the user is not found
  if (user == null) {
    return callback({
      message: "Invalid credentials"
    });
  }

  // Check the hash
  if (!bcryptjs.compareSync(password, user.password)) {
    return callback({
      message: "Invalid credentials"
    });
  }

  // Generate access token
  const token = generateAccessToken(username);
  return callback(null, { ...user.toJSON(), token });
}

/**
 * Register service, saving the request to the database
 * @param {*} params 
 * @param {*} callback 
 * @returns 
 */
const register = async (params, callback) => {
  if (params.username === undefined) return callback({ message: "Username required" });

  // Creating User
  const user = new User(params);

  // Saving user
  user.save()
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

export {
  login,
  register
}
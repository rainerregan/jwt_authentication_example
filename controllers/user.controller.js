import bcryptjs from 'bcryptjs';
import { login as loginService, register as registerService } from '../services/user.services.js';

/**
 * Register function
 * @param {*} req 
 * @param {*} res 
 * @param {*} next Callback function
 */
const register = (req, res, next) => {
  const { password } = req.body; // Auto parse from body and get the password
  const salt = bcryptjs.genSaltSync(10); // Generate Salt from the function

  // Hashing password from the text using salt into hash
  // After hashing, assign the hash into the req body
  req.body.password = bcryptjs.hashSync(password, salt);

  // Register user using the user service
  registerService(req.body, (error, result) => {
    if (error) return next(error); // If error, call the callback with error

    return res.status(200).send({
      message: "Success",
      data: result
    })
  })
}

/**
 * Login user 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next Callback function
 */
const login = (req, res, next) => {
  const { username, password } = req.body;

  // Login user using service
  loginService({ username, password }, (error, result) => {
    if (error) return next(error); // If error, call the callback with error

    return res.status(200).send({
      message: "Success",
      data: result
    })
  })
}

const userProfile = (req, res, next) => {
  return res.status(200).json({ message: "Authorized User!" });
}

export {
  login,
  register,
  userProfile
}
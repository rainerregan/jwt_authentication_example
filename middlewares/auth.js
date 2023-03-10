import jwt from "jsonwebtoken";

/**
 * This will be used for authenticating token from the request sent to the API
 * @param {*} req 
 * @param {*} res 
 * @param {*} next Callback function
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']; // Get the authorization token from the request
  const token = authHeader && authHeader.split(' ')[1]; // Get the token from splitting the string with space and get the second section

  // If the token does not exists
  if (token == null) return res.sendStatus(401);

  // Verifying the token using the customized secret key
  jwt.verify(token, "Snippet_SecretKEY", (err, user) => {
    if (err) return res.sendStatus(403); // If the verifying process has errors, sending status 403

    // Setting the user to user verified by jwt
    req.user = user;

    // Calling the callback
    next();
  });
}

/**
 * This function will be used to generate/sign the access token for requested username
 * @param {string} username 
 */
const generateAccessToken = (username) => {
  // Passing the data and the options
  return jwt.sign(
    {
      data: username
    },
    "Snippet_SecretKEY",
    {
      expiresIn: "1h"
    }
  );
}

export {
  authenticateToken,
  generateAccessToken
}
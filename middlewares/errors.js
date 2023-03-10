
/**
 * Error handler middleware
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next Callback functions
 */
const errorHandler = (err, req, res, next) => {
  // Check if the error has the type of string
  if (typeof err === "string") {
    return res.status(400).json({ message: err });
  }

  // Check if the type is ValidationError
  if (typeof err === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }

  // Check if the type is
  if (typeof err === "UnauthorizedError") {
    return res.status(401).json({ message: err.message });
  }

  // Return the default error
  return res.status(500).json({ message: err.message });
}

export {
  errorHandler
}
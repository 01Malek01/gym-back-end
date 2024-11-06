class AppError extends Error {
  constructor(message, statusCode) {
    //inherit message
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor); //for debugging
  }
}

export default AppError;

import { ApiError } from "../utils/apiError.js";

const sendErrorDev = (error, res) => {
  res.status(error.statusCode).json({
    status: error.status,
    error: error,
    message: error.message,
    stack: error.stack,
  });
};

const sendErrorProd = (error, res) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    console.log(error.name, error.message);
    res
      .status(500)
      .json({ status: "error", message: "Something went very wrong" });
  }
};

const handelCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new ApiError(message, 400);
};

const handelDuplicateErrorDB = (err) => {
  const value = err.keyValue.name;
  const message = `Invalid field value: ${value}, please use another value!`;
  return new ApiError(message, 400);
};

const handelValidationDB = (err) => {
  const errosList = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data: ${errosList.join(". ")}`;
  return new ApiError(message, 400);
};

const handelJWTError = () =>
  new ApiError("Invalid token. please log in again!", 401);

const handelJWTExpiredError = () =>
  new ApiError("Your token has expired! please log in again!", 401);

export default (error, req, res, _next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(error, res);
    return;
  }

  if (process.env.NODE_ENV === "production") {
    let err = { ...error };
    err.message = error.message;
    err.name = error.name;

    if (err.name === "CastError") err = handelCastErrorDB(err);
    if (err.code === 11000) err = handelDuplicateErrorDB(err);
    if (err.name === "ValidationError") err = handelValidationDB(err);

    if (err.name === "JsonWebTokenError") err = handelJWTError();
    if (err.name === "TokenExpiredError") err = handelJWTExpiredError();

    sendErrorProd(err, res);
    return;
  }

  // Default fallback
  sendErrorProd(error, res);
};

import ApiError from "./ApiError.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const usrMsg = err.usrMsg || "Something went Wrong,Please try.";
  // console.log(usrMsg,'-h')

  // console.error(`[${new Date().toISOString()}] ${statusCode} - ${usrMsg}`);
  // console.log(new ApiError(statusCode, usrMsg));

  return res.status(statusCode).json(new ApiError(statusCode, usrMsg));
};
export default errorHandler;

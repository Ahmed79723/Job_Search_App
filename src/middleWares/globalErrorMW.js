// global error handler middleware used provide unified
// error response for the entire app
export const globalErrorMW = (err, req, res, next) => {
  res.status(err.statusCode ?? 500).json({
    error: "Something went wrong",
    message: err.message,
    code: err.statusCode ?? 500,
    stack: err.stack,
  });
};

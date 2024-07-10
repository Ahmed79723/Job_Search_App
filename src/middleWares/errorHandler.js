// this function is used to wrap all app controllers and implicitly 
// catch errors and send them to the global error handler middleware to provide unified
// error response for the entire app
// ~=====================================|error handler|===================================================
export function errorHandler(fn) {
  return async (req, res, next) => {
    fn(req, res, next).catch((err) => {
      next(err);
    });
  };
}

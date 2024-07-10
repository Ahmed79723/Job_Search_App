// this function is used to create a new error class module that
//  extends from the original Error js built in class to provide a unified error
// structure with a dynamic msg and statuscode for the entire app
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

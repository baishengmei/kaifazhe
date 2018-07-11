/**
 * wrap error uniformly
 * @method      NodeError
 * @param       {String}  msg
 * @param       {String}  name
 * @param       {String}  type  system, redirect, timeout, ...
 * @param       {String}  origin  one of system, backend, frontend, internal
 * @param       {Number}  errno system is negated, backend is positive,
 * frontend and internal is http status code, 2000 means backend redirect error
 * @constructor
 */
function NodeError(
  msg,
  name,
  type = 'unknown',
  origin = 'internal',
  errno = 500,
) {
  Error.captureStackTrace(this, this.constructor);
  this.name = name;
  this.message = msg;
  this.type = type;
  this.origin = origin;

  if (origin === 'system') {
    // https://nodejs.org/dist/v6.9.4/docs/api/errors.html#errors_error_errno
    // 1000 stands for system error in http request
    this.code = 1000;
  } else if (origin === 'backend') {
    // 2000+ stands for backend error in http request
    // 2500 means redirect error during http request with backend or
    // some other unknown error
    this.code = 2000 + errno;
  } else {
    // internal is 500,
    // fronend is the same as http status code
    this.code = errno;
  }
}

Error.stackTraceLimit = 20;
require('util').inherits(NodeError, Error);

export default NodeError;

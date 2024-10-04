class CustomErrorHandler extends Error {
  constructor(status = 404, errmssg = "Internal Server Error") {
    super(errmssg);
    this.status = status;
    this.message = errmssg;
  }
}

module.exports = CustomErrorHandler;

const customErrorHandler = (err, req, res, next) => {
  console.error(err);
  return res.status(err.status).json({ sucess: false, message: err.message });
};

module.exports = customErrorHandler;

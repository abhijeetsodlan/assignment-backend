const errorHandler = (err, _req, res, _next) => {
  const statusCode = err.name === 'ValidationError' ? 400 : err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error'
  });
};

module.exports = errorHandler;

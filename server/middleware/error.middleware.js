export const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = [];

  // Mongoose Validation Errors
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation Failed";

    errors = Object.values(err.errors).map((error) => {
      return {
        field: error.path,
        message: error.message,
        value: error.value,
      };
    });
  }
  if (err.code == "E11000") {
    statusCode = 400;
    message = "Duplicate field entered";
    errors = Object.values(err.errors).map((error) => ({
      field: error.path,
      message: error.message,
      value: error.value,
    }));
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    problem: err.errors || [],
  });
};

const apiSuccess = (res, message, data) => {
  return res.status(200).json({
    success: true,
    message,
    data,
  });
};

const apiFailure = (res, statsCode = 500, message, error) => {
  return res.status(statsCode).json({
    status: false,
    message,
    error,
  });
};

module.exports = { apiSuccess, apiFailure };

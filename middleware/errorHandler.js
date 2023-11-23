const { errorConstants } = require('../config/errorConstants')

const errorHandlerMiddleware = (err, req, res, next) => {

    const resStatusCode = res.statusCode ? res.statusCode : 500;

    switch (resStatusCode) {
        case errorConstants.VALIDATION_ERROR:
            res.json({
                title: "Validation Failed",
                message: err.message,
                errorStackTrace: err.stack
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack,
            });
        case constants.UNAUTHORIZED:
            res.json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stack,
            });
        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack,
            });
        case constants.SERVER_ERROR:
            res.json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack,
            });
        default:
            console.log("No Error, All good !");
            break;
    }
}


module.exports = errorHandlerMiddleware

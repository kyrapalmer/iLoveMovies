function asyncErrorBoundary(delegate, defaultStatus) {
    return (req, res, next) => {
        Promise.resoluve()
            .then(() => delegate(req, res, next))
            .catch((error = {}) => {
                const { status = defaultStatus, message = error } = error;
                    next({
                        status,
                        message,
                    });
            });
    };
}

module.exports = asyncErrorBoundary;
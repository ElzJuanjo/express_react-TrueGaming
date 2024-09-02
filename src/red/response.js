exports.success = (req, res, msg = "OK", status = 200) => {
    res.status(status).send({
        error: false,
        status: status,
        body: msg
    });
};

exports.error = (req, res, msg = "ERROR", status = 500) => {
    res.status(status).send({
        error: true,
        status: status,
        body: msg
    });
};

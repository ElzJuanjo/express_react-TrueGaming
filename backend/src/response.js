export const success = (req, res, msg, status) => {
    res.status(status).json(msg);
};

export const reject = (req, res, msg, status) => {
    res.status(status).json({
        error: msg
    });
}

const authValidation = (req, res, next) => {
    if (req.headers?.authorization)
        next()
    else
        res.send("no authorization.")
};

module.exports = {
    authValidation
}

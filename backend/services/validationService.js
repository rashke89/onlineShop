const authValidation = (req, res, next) => {
    console.log(req.headers.authorization);
    if (req.headers?.authorization)
        next()
    else
        res.send("no authorization.")
};

module.exports = {
    authValidation
}

const validateUserAuth = (req,res,next) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({
            success: false,
            message: "couldnt validateUser",
            err: "email or password missing"
        })
       
    }
    next();
}

module.exports = {
    validateUserAuth,
}
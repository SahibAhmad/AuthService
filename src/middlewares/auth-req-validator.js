const validateUserAuth = (req,res,next) => {
    
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({
            success: false,
            message: "couldnt validate User",
            err: "email or password missing"
        })
       
    }
    next();
}

const isAdminValidator = (req,res,next) => {
    if(!req.body.id) {
        return res.status(400).json({
            success: false,
            err: "user id not given",
            message: "something went wrong",
        });
    }
    next();
}

module.exports = {
    validateUserAuth,
    isAdminValidator
}
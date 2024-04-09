const {UserService} = require('../services/index');
const userService = new UserService();
const signUp = async (req,res) => {
    try {
        
       const  user = await userService.create({
            email: req.body.email,
            password: req.body.password,
        });
    
        return res.status(201).json({
            data: user,
            success: true,
            message: "successfully created a user",
            err: {},
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            err: error,
            message: "couldnt create user",
        });
    }
}

const signIn = async (req,res) => {
    try {
        const response = await userService.signIn(req.body.email,req.body.password);
        return res.status(200).json({
            message: "successfully signed up",
            success: true,
            data: response,
            err: {},

        });
    } catch (error) {
        
    }
}

module.exports = {
    signUp,
    signIn,
}
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
        // console.log(error.error.error.name);
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
        return res.status(500).json({
            message: "coulndt sign in",
            success: false,
            data: {},
            err: {error: "signin error"}
        });
    }
}

const isAuthenticated = async (req,res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            success: true,
            error: {},
            data: response,
            message: "user is authenticated and token is valid",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            err: error,
            data: {},
            message: "something went wrong during authentication"
        });
    }
}

const isAdmin = async (req,res) => {
    try {
        const response = await userService.isAdmin(req.body.id);
        
        return res.status(200).json({
            success: true,
            data: response,
            message: "Successfully fetcheddd whethere user is admin or not",
            err: {},
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: {},
            message: "something went wrong",
            err: error,
        });
    }
}

module.exports = {
    signUp,
    signIn,
    isAuthenticated,
    isAdmin,
}
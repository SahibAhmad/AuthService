const {UserService} = require('../services/index');
const userService = new UserService();
const create = async (req,res) => {
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

module.exports = {
    create,
}
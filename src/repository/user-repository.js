const { User , Role} = require('../models/index');
const { JWT_KEY } = require('../config/serverConfig');
const ValidationError = require('../utils/error-handlers/validation-error');
const ClientError = require('../utils/error-handlers/client-error')

class UserRepository {
    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            // console.log(error);
            console.log("something went wrong at repository layer");
            
            if(error.name == 'SequelizeValidationError')
            {
                throw new ValidationError(error);
                
            }
            throw  error ;
        }
    }

    async delete(userId) {
        try {
            await User.destroy({
                where: {
                    id: userId,
                }
            });
            return true;
        } catch (error) {
            console.log("something went wrong at repository layer");
            throw { error };
        }
    }

    async getById(userId) {
        try {
            const user = await User.findByPk(
                userId, {
                attributes: ['email', 'id'],
            }
            );

            return user;
        } catch (error) {
            console.log("some thing went wrong in repository layer");
            throw { error };
        }
    }
    
    async getByEmail(emailId) {
        try {
            const user = await User.findOne({where: {
                email : emailId,
            }});
            // if(!user) {
            //     throw new ClientError();
            // }
            return user;
        } catch (error) {
            if(!user) {
                throw new ClientError();
            }
            console.log("some thing went wrong in repository layer");
            throw  error ;
        }
    }
  
    async isAdmin (userId) {
        try {
            const user = await User.findByPk(userId);
            
            const adminRole = await Role.findOne({
                where: {
                    name: "ADMIN",
                }
            });
           
                      
            return await user.hasRole(adminRole);
        } catch (error) {
            console.log("something went wrong in repository layer");
            throw {error};
        }
    }
}

module.exports = UserRepository
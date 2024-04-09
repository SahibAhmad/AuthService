const { User } = require('../models/index');
const { JWT_KEY } = require('../config/serverConfig');

class UserRepository {
    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log("something went wrong at repository layer");
            throw { error };
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
            }})
            return user;
        } catch (error) {
            console.log("some thing went wrong in repository layer");
            throw { error };
        }
    }
}

module.exports = UserRepository
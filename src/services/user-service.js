const {UserRepository} = require('../repository/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_KEY} = require('../config/serverConfig')
class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("something went wrong at service layer");
            throw {error};
        }
    }

    async delete (data) {
        try {
            const response = await this.userRepository.delete(userId);
            return response;
        } catch (error) {
            console.log("something went wrong at service layer");
            throw {error};
        }
    }

    async signIn(email,plainPassword) {
        try {
            const user = await this.userRepository.getByEmail(email);
           
            const passwordMatch = this.checkPassword(plainPassword,user.password);
            if(!passwordMatch) {
                console.log("password didnt match ");
                throw {error : "incorrect password"};
            }

            const newJWT = this.createToken({email: user.email, id: user.id});
            return newJWT;

        } catch(error) {
            console.log("something went wrong while signing in");
            throw {err: "Couldnt sign in"};
        }
    }

    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token);
            if(!response) {
                throw {error: "invalide token"};
            }
            // next line checks whether the user with given id obtained from token exists or not
            // It might be possible that that user is delete
            
            const user = this.userRepository.getById(response.id);
            if(!user) {
                throw {error: "no user with the corresponding token exists"};
            }

            return user.id;
        } catch (error) {
            
        }
    }
    async isAdmin(userId) {
        try {
            const response =  await this.userRepository.isAdmin(userId);
            
            return response;
        } catch(error) {
            console.log("some thing went wrong in service layer");
            throw {error: "Admin Check failed"};
        }
    }

    checkPassword (userInputPlainPassword,encryptedPassword) {

        return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
    }

    createToken(user) {
        try {
            const token = jwt.sign(user, JWT_KEY,{ expiresIn: '1h' });
            return token;
        } catch (error) {
            console.log('something went wrong during token creation ');
            throw {error};
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token,JWT_KEY);
            return response;
        } catch(error) {
            console.log("error while verifying the token");
            throw {error};
        }
    }

}

module.exports = UserService
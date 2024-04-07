const dotenv = require('dotenv');
const bcrypt = require('bcrypt')
const saltRounds = 10;

dotenv.config();


module.exports = {
    PORT: process.env.PORT,
    SALT: bcrypt.genSaltSync(saltRounds),
};


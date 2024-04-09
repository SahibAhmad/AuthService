const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig');
const apiRouter = require('./routes/index.js');
// const bcrypt  = require('bcrypt');
// const {User } = require('./models/index.js')

const setupAndStartServer = async function () {
    try {
        const app = express();

        // Mount bodyParser middleware before the router
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        // Mount the apiRouter
        app.use('/api', apiRouter);

        // const user1 = await User.findByPk(3);
        // const user2 = await User.findByPk(2);
        // console.log(user1.password===user2.password);
        // const ans = bcrypt.compareSync("12abcd", user1.password); // true
        // console.log(ans);

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server started at ${PORT}`);
        });
    } catch (error) {
        console.error('Error setting up and starting the server:', error);
    }
};

setupAndStartServer();

const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig');
const apiRouter = require('./routes/index.js');
const db = require('./models/index.js');
const {User,Role} = db;

const setupAndStartServer = async function () {
    try {
        const app = express();

        // Mount bodyParser middleware before the router
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        // Mount the apiRouter
        app.use('/api', apiRouter);
  
        app.listen(PORT, async () => {
            console.log(`Server started at ${PORT}`);
            if(process.env.DB_SYNC ) {
                db.sequelize.sync({alter: true});
            }
            // const u1 = await User.findByPk(1);
            // const r1 = await Role.findByPk(2);
            // // u1.addRole(r1); 
            // // let roles = await u1.getRoles();
            // // console.log(roles[1]);
            // console.log(await u1.hasRole(r1))

        });
    } catch (error) {
        console.error('Error setting up and starting the server:', error);
    }
};

setupAndStartServer();

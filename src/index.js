const express = require('express');
const { PORT } = require('./config/serverConfig');
const apiRouter = require('./routes/index.js')

const setupAndStartServer = async function () {
    try {
        const app = express();
        app.use('/api',apiRouter);
        app.listen(PORT, () => {
            console.log(`Server started at ${PORT}`);
        });

    } catch (error) {
        console.error('Error setting up and starting the server:', error);
    }
};

setupAndStartServer();

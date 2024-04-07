const express = require('express');
const {userController} = require('../../controllers/index');
const router = express.Router();

router.post('/user',userController.create);
module.exports = router
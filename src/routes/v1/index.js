const express = require('express');
const {userController} = require('../../controllers/index');
const router = express.Router();

router.post('/signUp',userController.signUp);
router.post('/signIn',userController.signIn); //post because it seems to change

module.exports = router
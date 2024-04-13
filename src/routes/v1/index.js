const express = require('express');
const router = express.Router();
const {userController} = require('../../controllers/index');
const {AuthRequestValidatorMiddleware } = require('../../middlewares/index');


router.post('/signUp',AuthRequestValidatorMiddleware.validateUserAuth,userController.signUp);
router.post('/signIn',AuthRequestValidatorMiddleware.validateUserAuth,userController.signIn); //post because it seems to change


router.get('/isAuthenticated', userController.isAuthenticated)
module.exports = router

router.get('/isAdmin',AuthRequestValidatorMiddleware.isAdminValidator,userController.isAdmin);
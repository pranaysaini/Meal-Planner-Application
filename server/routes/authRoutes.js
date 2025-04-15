const express = require('express')
const router = express.Router();
const {check} = require('express-validator')

const authController = require("../controllers/authControllers")
const auth = require("../middleware/auth")

router.post(
    '/register',
    [
        check('username', "A Username is required").not().isEmpty(),
        check('email', "Enter a valid email").isEmail(),
        check('password', "Enter correct password having length of 6 characters").isLength({min: 6})
    ],

    authController.register
)

router.post(
    '/login',
    [
        check('email', "Email is not registered").isEmail(),
        check('password', 'It is invalid password').exists()
    ],
    
    authController.login
)

router.get('/me', auth, authController.getIn)
module.exports = router;
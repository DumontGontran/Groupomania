const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const registerValidation = require('../middleware/registerValidation');
const userSchema = require('../validations/registerSchema');

router.post('/register', registerValidation(userSchema), userCtrl.register);
/* router.post('/login', userCtrl.login); */

module.exports = router;
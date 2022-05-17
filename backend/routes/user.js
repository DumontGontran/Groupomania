const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const schema = require('../schemas/user')
const bodyValidation = require('../middleware/bodyValidation');

router.post('/register', bodyValidation(schema.register), userCtrl.register);
router.post('/login', bodyValidation(schema.login), userCtrl.login);

module.exports = router;
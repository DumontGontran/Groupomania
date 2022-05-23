const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const schema = require('../schemas/user');
const bodyValidation = require('../middleware/bodyValidation');
const auth = require('../middleware/auth');

router.post('/register', bodyValidation(schema.register), userCtrl.register);
router.post('/login', bodyValidation(schema.login), userCtrl.login);
router.patch('/profil/:id', auth, bodyValidation(schema.update), userCtrl.updateOneUser);
router.get('/profil/:id', auth, userCtrl.getOneUser);

module.exports = router;
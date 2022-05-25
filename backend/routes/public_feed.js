const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/public_feed');
const auth = require('../middleware/auth');
const schema = require('../schemas/post');
const bodyValidation = require('../middleware/bodyValidation');
const multer = require('../middleware/multer-config');

router.post('/post', auth, multer, bodyValidation(schema.newPost), postCtrl.newPost);

module.exports = router;
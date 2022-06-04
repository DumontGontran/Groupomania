const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/public_feed');
const auth = require('../middleware/auth');
const schema = require('../schemas/post');
const bodyValidation = require('../middleware/bodyValidation');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, bodyValidation(schema.createPost), postCtrl.createOnePost);
router.post('/comment', auth, bodyValidation(schema.createComment), postCtrl.createOneComment);

router.get('/', auth, postCtrl.getAllPost);
router.get('/comment/', auth, postCtrl.getAllCommentByPost);

router.patch('/comment/:id', auth, bodyValidation(schema.modifyComment), postCtrl.updateOneComment);
router.patch('/:id', auth, bodyValidation(schema.modifyPost), postCtrl.updateOnePost);

router.delete('/:id', auth, postCtrl.deleteOnePost);
router.delete('/comment/:id', auth, postCtrl.deleteOneComment);

module.exports = router;
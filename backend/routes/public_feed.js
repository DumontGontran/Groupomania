const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/public_feed');
const auth = require('../middleware/auth');
/* const schema = require('../schemas/post');
const bodyValidation = require('../middleware/bodyValidation'); */
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, postCtrl.createOnePost);
router.post('/comment', auth, postCtrl.createOneComment);

router.get('/', auth, postCtrl.getAllPost);
router.get('/comment/', auth, postCtrl.getAllCommentByPost);

router.patch('/comment/:id', auth, postCtrl.updateOneComment);
router.patch('/:id', auth, postCtrl.updateOneComment);

router.delete('/:id', auth, postCtrl.deleteOnePost);
router.delete('/comment', auth, postCtrl.deleteOneCommentByPost);

module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controllers/userController');

const upload = multer({ dest: 'public/' }); 

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/register', upload.single('avatar'), userController.createUser);
router.post('/login', userController.loginUser);

module.exports = router;
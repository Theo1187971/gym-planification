const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const exerciseController = require('../controllers/exerciseController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/createExercises', exerciseController.createExercises);

module.exports = router;

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const exerciseController = require('../controllers/exerciseController');
const sessionController = require('../controllers/sessionCreationController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/createExercises', exerciseController.createExercises);
router.get('/exercises', sessionController.getAllExercises);

module.exports = router;

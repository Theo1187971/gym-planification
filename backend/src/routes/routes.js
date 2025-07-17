const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const exerciseController = require('../controllers/exerciseController');
const workoutController = require('../controllers/workoutController');

router.post('/auth/signup', authController.signup);
router.post('/auth/login', authController.login);
router.post('/createExercises', exerciseController.createExercises);
router.get("/workout/:workout_id", workoutController.getWorkout);

module.exports = router;

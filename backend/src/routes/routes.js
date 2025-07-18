const express = require('express');
const upload = require('../utils/upload');
const router = express.Router();
const authController = require('../controllers/authController');
const exerciseController = require('../controllers/exerciseController');
const sessionController = require('../controllers/sessionCreationController');
const workoutController = require('../controllers/workoutController');
const accountController = require('../controllers/accountController');
const aboutUsController = require('../controllers/aboutUsController');


router.post('/auth/signup', authController.signup);
router.post('/auth/login', authController.login);
router.post('/createExercises', exerciseController.createExercises);
router.get("/workout/:workout_id", workoutController.getWorkout);
router.post('/my-account', accountController.getMyAccount);
router.put('/my-account/update', upload.single('avatar'), accountController.updateMyAccount);
router.get('/exercises', sessionController.getAllGymExercises);
router.post('/addFitnessSession', sessionController.createWorkoutWithExercises);
router.get('/workout/:workout_id', workoutController.getWorkout);
router.get('/user-workouts', workoutController.getWorkouts);
router.get('/about-us/random-image', aboutUsController.randomImage);

module.exports = router;

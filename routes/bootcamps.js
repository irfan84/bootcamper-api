const express = require('express');
const router = express.Router();
const {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsInRadius,
    bootcampPhotoUpload
} = require('../controllers/bootcamps');

const Bootcamp = require('../models/Bootcamp');

const advancedResults = require('../middleware/advancedResults');
const { protect, authorise } = require('../middleware/auth');

// Include other resource routers
const courseRouter = require('./courses');
const reviewRouter = require('./reviews');

//Re-route in to other resource routers
router.use('/:bootcampId/courses', courseRouter);
router.use('/:bootcampId/reviews', reviewRouter);

router
    .route('/radius/:zipcode/:distance')
    .get(getBootcampsInRadius);

router
    .route('/:id/photo')
    .put(protect, authorise('admin', 'publisher'), bootcampPhotoUpload);

router
    .route('/')
    .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
    .post(protect, authorise('admin', 'publisher'), createBootcamp);

router
    .route('/:id')
    .get(getBootcamp)
    .put(protect, authorise('admin', 'publisher'), updateBootcamp)
    .delete(protect, authorise('admin', 'publisher'), deleteBootcamp);

module.exports = router;
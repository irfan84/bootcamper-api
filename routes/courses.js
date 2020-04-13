const express = require('express');
const router = express.Router( {mergeParams: true} );
const {
    getCourses, getCourse, addCourse, updateCourse, deleteCourse
} = require('../controllers/courses');

const Course = require('../models/Course');
const advancedResults = require('../middleware/advancedResults');
const { protect, authorise } = require('../middleware/auth');

router
    .route('/')
    .get(advancedResults(Course, {
        path: 'bootcamp',
        select: 'name description'
    }), getCourses)
    .post(protect, authorise('admin', 'publisher'), addCourse);

router
    .route('/:id')
    .get(getCourse)
    .put(protect, authorise('admin', 'publisher'), updateCourse)
    .delete(protect, authorise('admin', 'publisher'), deleteCourse);

module.exports = router;
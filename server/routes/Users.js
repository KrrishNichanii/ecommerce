const express = require('express');
const { fetchUserById, updateUser, fetchUserRecommended } = require('../controller/User');

const router = express.Router();
//  /users is already added in base path
router.get('/:id', fetchUserById)
      .patch('/:id', updateUser)
      .get('/own/:id',fetchUserById)
      .get('/recommended/:id',fetchUserRecommended)

exports.router = router;
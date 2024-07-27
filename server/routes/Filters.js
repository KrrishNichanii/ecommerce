const express = require('express');
const { fetchFilter, createFilter, fetchFilterByCatName } = require('../controller/Filter');

const router = express.Router();
//  /categories is already added in base path
router.get('/:id', fetchFilter)
      .post('/',createFilter) 
      .get('/cat-name/:name',fetchFilterByCatName) ; 
exports.router = router;
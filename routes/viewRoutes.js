const express = require('express');
const viewController = require('../controllers/viewsController');

const router = express.Router();

router.get('/', viewController.homepage);

module.exports = router;

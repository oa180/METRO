const express = require('express');
const stationController = require('../controllers/stationController');

const router = express.Router();
router.get('/', stationController.getAllStations);
router.get('/:id', stationController.getStation);
module.exports = router;

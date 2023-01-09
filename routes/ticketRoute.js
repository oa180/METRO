const express = require('express');
const ticketController = require('../controllers/ticketController');

const router = express.Router();

router.post('/', ticketController.startTrip);
router.post('/:id', ticketController.exitTrip);
router.get('/', ticketController.getAllTickets);
module.exports = router;

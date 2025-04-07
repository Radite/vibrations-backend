const express = require('express');
const router = express.Router();
const competitionController = require('../controllers/competitionController');

router.post('/', competitionController.createCompetition);
router.post('/:id/entries', competitionController.addEntry);

module.exports = router;

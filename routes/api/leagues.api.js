const router = require('express').Router(),
	leaguesController = require('../../controllers/leagues.controller');

// ROUTE: /api/leagues
router.route('/').get(leaguesController.findAll);

module.exports = router;

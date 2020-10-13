const router = require('express').Router(),
	usersController = require('../../controllers/users.controller');

// ROUTE: /api/users
router.route('/').get(usersController.findAll);

module.exports = router;

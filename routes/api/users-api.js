const router = require('express').Router(),
	usersController = require('../../controllers/users-controller');

// ROUTE: /api/users
router.route('/').get(usersController.findAll);

// ROUTE: /api/users/register
router.route('/register').post(usersController.register);

// ROUTE: /api/users/login
router.route('/login').post(usersController.login);

// ROUTE: /api/users/:email
router.route('/:email').get(usersController.findByEmail).put(usersController.updatePassword);

module.exports = router;

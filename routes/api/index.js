const router = require('express').Router(),
	userRoutes = require('./users.api'),
	leagueRoutes = require('./leagues.api');

router.use('/users', userRoutes);
router.use('/leagues', leagueRoutes);

module.exports = router;

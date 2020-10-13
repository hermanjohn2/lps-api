const router = require('express').Router(),
	apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.use('/', (req, res) => res.json('LPS SERVER'));

module.exports = router;

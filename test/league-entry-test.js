const League = require('../models/league-model');

const leagueCreationTest = () => {
	// delete previous entry
	League.findOneAndDelete({ name: 'Test 1' }).then(data => {
		// create a user a new user
		var testLeague = new League({
			name: 'Test 1',
			password: 'Password123',
			leagueManager: '5f888cadddd1ca0e80ec51f8',
			totalPicks: 10,
			users: [{ userId: '5f888cadddd1ca0e80ec51f8', username: 'test1' }]
		});

		testLeague.save(err => {
			if (err) throw err;

			// fetch user and test password verification
			League.findOne({ name: 'Test 1' }, (err, league) => {
				if (err) throw err;

				console.log(league);

				// test a matching password
				league.comparePassword('Password123', function (err, result) {
					if (err) throw err;
					console.log('Password123:', result);
				});

				// test a failing password
				league.comparePassword('123Password', (err, result) => {
					if (err) throw err;
					console.log('123Password:', result);
				});
			});
		});
	});
};

module.exports = leagueCreationTest;

const User = require('../models/user-model');

const userCreationTest = () => {
	// delete previous entry
	User.findOneAndDelete({ email: 'test1@email.com' }).then(data => {
		// create a user a new user
		var testUser = new User({
			email: 'test1@email.com',
			password: 'Password123',
			username: 'test1'
		});

		testUser.save(err => {
			if (err) throw err;

			// fetch user and test password verification
			User.findOne({ email: 'test1@email.com' }, (err, user) => {
				if (err) throw err;

				console.log(user);

				// test a matching password
				user.comparePassword('Password123', function (err, result) {
					if (err) throw err;
					console.log('Password123:', result);
				});

				// test a failing password
				user.comparePassword('123Password', (err, result) => {
					if (err) throw err;
					console.log('123Password:', result);
				});
			});
		});
	});
};

module.exports = userCreationTest;

const bcrypt = require('bcrypt');

const User = require('../models').User;

module.exports = {
	findAll: (req, res) => {
		User.find(req.query)
			.then(data => res.json(data))
			.catch(err => res.status(422).json(err));
	},
	findByEmail: (req, res) => {
		User.findOne({ email: req.params.email })
			.then(data => res.json(data))
			.catch(err => res.status(422).json(err));
	},
	register: (req, res) => {
		User.create(req.body)
			.then(data => res.json(data))
			.catch(err => res.status(422).json(err));
	},
	login: (req, res) => {
		User.findOne({ email: req.body.email })
			.then(data => {
				data.comparePassword(req.body.password, (err, result) => {
					if (result)
						res.json({
							_id: data._id,
							username: data.username,
							leagues: data.leagues
						});
					else res.status(422).json({ error: 'Invalid password' });
				});
			})
			.catch(err => {
				res.status(422).json(err);
			});
	},
	updatePassword: (req, res) => {
		const newPassword = req.body.password;
		const hashedPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10), null);

		User.updateOne({ email: req.params.email }, { password: hashedPassword })
			.then(data => res.json(data))
			.catch(err => console.log(err));
	}
};

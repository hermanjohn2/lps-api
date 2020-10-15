const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	uniqueValidator = require('mongoose-unique-validator'),
	bcrypt = require('bcrypt'),
	saltRounds = 10;

const LeagueSchema = new Schema({
	name: {
		type: String,
		required: [true, 'League name required'],
		unique: true
	},
	password: {
		type: String,
		required: [true, 'League Password Required']
	},
	leagueManager: {
		type: String,
		required: [true, 'League manager required']
	},
	totalPicks: {
		type: Number,
		required: [true, 'League picks required']
	},
	rules: [],
	users: [
		{
			userId: {
				type: String,
				required: [true, 'User ID required']
			},
			username: {
				type: String,
				required: [true, 'Username required']
			},
			picksLeft: {
				type: Number
			},
			position: {
				type: Number
			}
		}
	],
	createdAt: {
		type: Date,
		default: Date.now()
	}
});

LeagueSchema.plugin(uniqueValidator);

LeagueSchema.pre('save', function (next) {
	const league = this;

	// only hash the password if it is new or has been modified
	if (!league.isModified('password')) return next();

	// generate a salt
	bcrypt.genSalt(saltRounds, function (err, salt) {
		if (err) return next(err);

		// hash password using our new salt
		bcrypt.hash(league.password, salt, function (err, hash) {
			if (err) return next(err);

			// override entered password with the hashed one
			league.password = hash;

			next();
		});
	});
});

LeagueSchema.methods.comparePassword = function (enteredPassword, cb) {
	bcrypt.compare(enteredPassword, this.password, function (err, result) {
		if (err) return cb(err);
		cb(null, result);
	});
};

const League = mongoose.model('League', LeagueSchema);

module.exports = League;

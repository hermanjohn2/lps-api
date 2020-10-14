const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt'),
	saltRounds = 10;

// Set up middleware to verify type email
require('mongoose-type-email');
mongoose.SchemaTypes.Email.defaults.message = 'Email address is invalid';

const UserSchema = new Schema({
	email: {
		type: mongoose.SchemaTypes.Email,
		required: [true, 'User email required'],
		createIndexes: { unique: true }
	},
	password: {
		type: String,
		required: [true, 'User password required']
	},
	username: {
		type: String,
		required: [true, 'Username required'],
		createIndexes: { unique: true }
	},
	leagues: []
});

UserSchema.pre('save', function (next) {
	var user = this;

	// only hash the password if it is new or has been modified
	if (!user.isModified('password')) return next();

	// generate a salt
	bcrypt.genSalt(saltRounds, function (err, salt) {
		if (err) return next(err);

		// hash password using our new salt
		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) return next(err);

			// override entered password with the hashed one
			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword = function (enteredPassword, cb) {
	bcrypt.compare(enteredPassword, this.password, function (err, result) {
		if (err) return cb(err);
		cb(null, result);
	});
};

const User = mongoose.model('User', UserSchema);

module.exports = User;

const express = require('express'),
	morgan = require('morgan'),
	mongoose = require('mongoose'),
	dbConfig = require('./config/database-config'),
	routes = require('./routes'),
	app = express(),
	port = process.env.PORT || 3000;

const userTest = require('./test/user-entry-test');
const leagueTest = require('./test/league-entry-test');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('tiny'));

// Routes
app.use(routes);

// Database connection
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
})
	.then(() => console.log('Connected to database...'))
	.catch(err => {
		console.log('Unable to connect to database. Exiting...', err);
		process.exit();
	});

// Testing user and league creation -- Uncomment to run test
// userTest();
// leagueTest();

app.listen(port, () => {
	console.log(`🌎 ==> Listening on port ${port}`);
});

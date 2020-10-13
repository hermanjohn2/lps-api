const express = require('express'),
	morgan = require('morgan'),
	mongoose = require('mongoose'),
	dbConfig = require('./config/database.config');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('tiny'));

// Database connection
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => console.log('Connected to database...'))
	.catch(err => {
		console.log('Unable to connect to database. Exiting...', err);
		process.exit();
	});

app.get('/', (req, res) => {
	res.json('Welcome to the LPS server');
});

app.listen(port, () => {
	console.log(`🌎 ==> Listening on port ${port}.`);
});

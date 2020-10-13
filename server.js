const express = require('express'),
	morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('tiny'));

app.listen(port, () => {
	console.log(`🌎 ==> Listening on port ${port}.`);
});

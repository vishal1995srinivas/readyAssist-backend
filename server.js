import express from 'express';
import logger from 'morgan';
// import users from './routes/users';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from './config/database.js'; //database configuration
import users from './routes/index.js';
const { json } = express;
const { urlencoded } = bodyParser;
const app = express();
app.use(logger('dev'));
app.use(json());

// // connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(urlencoded({ extended: false }));

app.use(cors());
app.get('/', function(req, res) {
	res.json({ readyAssist: 'CRUD APIS with nodeJS' });
});

// public route

app.use('/v1/users', users);
app.use(function(req, res, next) {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// handle errors
app.use(function(err, req, res, next) {
	console.log(err);
	if (err.status === 404) res.status(404).json({ message: 'Not found' });
	else res.status(500).json({ message: 'Something looks wrong :( !!!' });
});
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
	console.log('Node server listening on port 5000');
});

//Set up mongoose connection
import mongoose from 'mongoose';
const { connect } = mongoose;
const mongoDB = 'mongodb://localhost:27017/readyAssist';
connect(process.env.MONGODB_URI || mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	console.log('db connection success');
});
mongoose.Promise = global.Promise;
export default mongoose;
/*const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));*/

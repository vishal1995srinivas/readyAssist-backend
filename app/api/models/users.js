import mongoose from 'mongoose';
const { model, Schema } = mongoose;
//Define a schema
const UserSchema = new Schema({
	username: {
		type: String,
		trim: true,
		required: true,
		unique: true
	},
	firstName: {
		type: String,
		trim: true,
		required: true
	},
	lastName: {
		type: String,
		trim: true,
		required: false
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date
	},
	isActive: {
		type: Boolean
	}
});

export default model('Users', UserSchema);

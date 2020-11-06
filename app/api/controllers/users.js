import userModel from '../models/users.js';
import { body } from 'express-validator';
import checkAPIs from 'express-validator';
const { validationResult } = checkAPIs;
const create = (req, res, next) => {
	try {
		const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
		if (!errors.isEmpty()) {
			res.status(422).json({ errors: errors.array() });
			return;
		}
		userModel.findOne({ username: req.body.username }, function(err, userInfo) {
			if (err) {
				next(err);
			} else {
				if (userInfo == null) {
					let username = req.body.username;
					let firstName = req.body.firstName;
					let lastName = req.body.lastName;
					let isActive = true;
					let updatedAt = Date.now();
					userModel.create({ username, firstName, lastName, isActive, updatedAt }, function(err, result) {
						if (err) next(err);
						else
							res.json({
								status: 'success',
								message: 'User added successfully!!!',
								data: result
							});
					});
				} else {
					res.json({
						status: 'failure',
						message: 'User already exists!!!',
						data: null
					});
				}
			}
		});
	} catch (err) {
		return next(err);
	}
};
const retrieve = async (req, res, next) => {
	let result = await userModel.find({}).limit(10);
	if (result) {
		res.json({
			status: 'success',
			message: 'Users retrieved successfully!!!',
			data: result
		});
	} else {
		res.json({
			status: 'failure',
			message: "Couldn't Retrieve the data . Something is wrong",
			data: null
		});
	}
};
const validate = (method) => {
	switch (method) {
		case 'createUser': {
			return [
				body('username', 'Invalid / No username').exists(),
				body('firstName', 'No firstName found').exists(),
				body('lastName', 'No lastName Found').exists()
			];
		}
	}
};
export { create, validate, retrieve };

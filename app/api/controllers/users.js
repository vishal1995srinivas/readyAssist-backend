import userModel from '../models/users.js';
import { body } from 'express-validator';
import checkAPIs from 'express-validator';
import mongoose from 'mongoose';
const { validationResult } = checkAPIs;
const create = async (req, res, next) => {
	try {
		const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
		if (!errors.isEmpty()) {
			res.status(422).json({ errors: errors.array() });
			return;
		}
		await userModel.findOne({ username: req.body.username }, function(err, userInfo) {
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
const updateById = async (req, res, next) => {
	const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
	if (!errors.isEmpty()) {
		res.status(422).json({ errors: errors.array() });
		return;
	}
	let id = req.body.id;
	let objectId = mongoose.Types.ObjectId(id);
	let firstName = req.body.firstName;
	let lastName = req.body.lastName;
	let updatedAt = Date.now();
	let updatedEntry = {
		firstName,
		lastName,
		updatedAt
	};
	try {
		await userModel.findByIdAndUpdate(objectId, updatedEntry, function(err, userInfo) {
			if (err) {
				next(err);
			} else {
				if (userInfo == null) {
					res.json({
						status: 'failure',
						message: 'No user present of the given id!!!',
						data: null
					});
				} else {
					res.json({
						status: 'success',
						message: 'User updated successfully!!!',
						data: userInfo
					});
				}
			}
		});
	} catch (error) {
		res.json({
			status: 'failure',
			message: "Couldn't update the data . Something is wrong",
			data: null
		});
	}
};
const retrieve = async (req, res, next) => {
	if (req.query.skip) {
		console.log(req.query);
		let skip = parseInt(req.query.skip);
		let result = await userModel.find({}).skip(skip).limit(10);
		console.log(result);
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
	} else {
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
	}
};
const retrieveById = async (req, res, next) => {
	let id = req.params.id;
	try {
		let objectId = mongoose.Types.ObjectId(id);
		await userModel.findById(objectId, function(err, userInfo) {
			if (err) {
				next(err);
			} else {
				if (userInfo === null) {
					res.json({
						status: 'success',
						message: 'No user present of the given id!!!',
						data: null
					});
				} else {
					res.json({
						status: 'success',
						message: 'User present !!!',
						data: userInfo
					});
				}
			}
		});
	} catch (error) {
		res.json({
			status: 'failure',
			message: "Couldn't Retrieve the data. Please check your id once again",
			data: null
		});
	}
};
const deleteById = async (req, res, next) => {
	const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
	if (!errors.isEmpty()) {
		res.status(422).json({ errors: errors.array() });
		return;
	}
	let id = req.body.id;
	let objectId = mongoose.Types.ObjectId(id);
	let isActive = false;
	let updatedEntry = {
		isActive
	};
	try {
		await userModel.findByIdAndUpdate(objectId, updatedEntry, function(err, userInfo) {
			console.log(userInfo);
			if (err) {
				next(err);
			} else {
				if (userInfo == null) {
					res.json({
						status: 'failure',
						message: 'No user present of the given id!!!',
						data: null
					});
				} else {
					res.json({
						status: 'success',
						message: 'User marked delete successfull!!!',
						data: userInfo
					});
				}
			}
		});
	} catch (error) {
		res.json({
			status: 'failure',
			message: "Couldn't delete the data . Something is wrong",
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
		case 'updateUser': {
			return [
				body('id', 'No id found').exists(),
				body('firstName', 'No firstName found').exists(),
				body('lastName', 'No lastName Found').exists()
			];
		}
		case 'deleteUser': {
			return [ body('id', 'No id found').exists() ];
		}
	}
};
export { create, validate, retrieve, retrieveById, updateById, deleteById };

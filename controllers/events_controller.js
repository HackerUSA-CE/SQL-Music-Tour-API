const events = require('express').Router();
const db = require('../models');
const { Event } = db;
const { Op } = require('sequelize');

//! CREATE
events.post('/', async (req, res) => {
	try {
		const createdEvent = await Event.create(req.body);
		res.status(200).json(createdEvent);
	} catch (e) {
		res.status(500).json(e);
	}
});

//! READ
events.get('/', async (req, res) => {
	try {
		const foundEvents = await Event.findAll();
		res.status(200).json(foundEvents);
	} catch (e) {
		res.status(500).json(e);
	}
});
events.get('/:id', async (req, res) => {
	try {
		const foundEvent = await Event.findOne({
			where: {
				event_id: req.params.id,
			},
		});
		res.status(200).json(foundEvent);
	} catch (e) {
		res.status(500).json(e);
	}
});

//! UPDATE

//! DELETE

module.exports = events;

const events = require('express').Router();
const db = require('../models');
const { Event, Stage, StageEvent, SetTime, MeetGreet, Band } = db;
const { Op } = require('sequelize');

//! CREATE
events.post('/', async (req, res) => {
	try {
		const newEvent = await Event.create(req.body);
		res.status(200).json({
			message: 'Created a new event',
			data: newEvent,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

//! READ
events.get('/', async (req, res) => {
	try {
		const foundEvents = await Event.findAll({
			order: [['date', 'ASC']],
			where: {
				name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` },
			},
		});
		res.status(200).json(foundEvents);
	} catch (error) {
		res.status(500).json(error);
	}
});
events.get('/:name', async (req, res) => {
	try {
		const foundEvent = await Event.findOne({
			where: { name: req.params.name },
			attributes: { exclude: ['event_id'] },
			include: [
				{
					model: MeetGreet,
					as: 'meet_greets',
					attributes: ['meet_start_time', 'meet_end_time'],
					include: {
						model: Band,
						as: 'band',
						attributes: ['name'],
					},
				},
				{
					model: SetTime,
					as: 'set_times',
					attributes: ['start_time', 'end_time'],
					include: [
						{
							model: Band,
							as: 'band',
							attributes: ['name'],
						},
						{
							model: Stage,
							as: 'stage',
							attributes: ['stage_name'],
						},
					],
				},
				{
					model: Stage,
					as: 'stages',
					attributes: { exclude: ['stage_id'] },
					through: { attributes: [] },
				},
			],
            order: [
                [{model: MeetGreet, as:'meet_greets'}, 'meet_start_time', 'ASC'],
                [{model: SetTime, as:'set_times'}, 'start_time', 'ASC'],
                [{model: Stage, as: 'stages'}, 'stage_name', 'ASC']
            ]
		});
		res.status(200).json(foundEvent);
	} catch (error) {
		res.status(500).json(error);
	}
});

//! UPDATE
events.put('/:id', async (req, res) => {
	try {
		const updatedEvents = await Event.update(req.body, {
			where: {
				event_id: req.params.id,
			},
		});
		res.status(200).json({
			message: `Successfully updated ${updatedEvents} event(s)`,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

//! DELETE
events.delete('/:id', async (req, res) => {
	try {
		const deletedEvents = await Event.destroy({
			where: {
				event_id: req.params.id,
			},
		});
		res.status(200).json({
			message: `Successfully deleted ${deletedEvents} event(s)`,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = events;

const bands = require('express').Router();
const db = require('../models');
const { Band, Event, MeetGreet, SetTime } = db;
const { Op } = require('sequelize');

// ! CREATE
// * Create a band
bands.post('/', async (req, res) => {
	try {
		const newBand = await Band.create(req.body);
		res.status(200).json({
			data: newBand,
			message: 'New band created',
		});
	} catch (e) {
		res.status(500).json(e);
	}
});

// ! READ
// * Find all bands
bands.get('/', async (req, res) => {
	try {
		const foundBands = await Band.findAll({
			attributes: ['band_id', ['name', 'band_name'], ['available_start_time', 'start_time'], 'end_time'],
			order: [['available_start_time', 'ASC']],
			where: {
				name: {
					[Op.like]: `%${req.query.name ? req.query.name : ''}%`,
				},
				genre: {
					[Op.like]: `%${req.query.genre ? req.query.genre : ''}%`,
				},
				// TODO: fix recommendation filter
				// recommendation: {
				//     [Op.like]: `${ req.query.rec ? '%' : '' }`
				// }
			},
		});
		res.status(200).json(foundBands);
	} catch (e) {
		res.status(500).json(e);
	}
});

// * Find one band
bands.get('/:name', async (req, res) => {
	try {
		const foundBand = await Band.findOne({
			where: { name: req.params.name },
			attributes: ['name', ['available_start_time', 'start_time'], 'end_time'],
			include: [
				{
					model: MeetGreet,
					as: 'meet_greets',
					attributes: ['meet_start_time', 'meet_end_time'],
					include: {
						model: Event,
						as: 'event',
						attributes: { exclude: ['event_id'] },
						where: {
							name: {
								[Op.like]: `%${req.query.event ? req.query.event : ''}%`,
							},
						},
					},
				},
				{
					model: SetTime,
					as: 'set_times',
					attributes: ['start_time', 'end_time'],
					include: {
						model: Event,
						as: 'event',
						attributes: { exclude: ['event_id'] },
						where: {
							name: {
								[Op.like]: `%${req.query.event ? req.query.event : ''}%`,
							},
						},
					},
				},
			],
			order: [
				[{ model: MeetGreet, as: 'meet_greets' }, { model: Event, as: 'event' }, 'date', 'DESC'],
				[{ model: SetTime, as: 'set_times' }, { model: Event, as: 'event' }, 'date', 'DESC'],
			],
		});
		res.status(200).json(foundBand);
	} catch (e) {
		res.status(500).json(e);
	}
});

// ! UPDATE
// * Update one band
bands.put('/:id', async (req, res) => {
	try {
		const updatedBands = await Band.update(req.body, {
			where: { band_id: req.params.id },
		});
		res.status(200).json({
			message: `Updated ${updatedBands} bands`,
		});
	} catch (e) {
		res.status(500).json(e);
	}
});

// ! DELETE
// * Delete one band
bands.delete('/:id', async (req, res) => {
	try {
		const deletedBands = await Band.destroy({
			where: { band_id: req.params.id },
		});
		res.status(200).json({
			message: `Deleted ${deletedBands} bands`,
		});
	} catch (e) {
		res.status(500).json(e);
	}
});

module.exports = bands;

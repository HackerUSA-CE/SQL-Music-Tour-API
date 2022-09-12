//DEPENDENCIES
const bands = require('express').Router()
const db = require('../models')
const { Band, MeetGreet, Event, SetTime } = db
const { Op } = require('sequelize')

//FIND ALL BANDS
bands.get('/', async (req, res) => {
    try {
        const foundBands = await Band.findAll({
            order: [['available_start_time', 'ASC']],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name: ''}%`}
            }
        })        
        res.status(200).json(foundBands)
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND A SPECIFIC BAND
bands.get('/:name', async (req, res) => {
    try {
        const foundBands = await Band.findOne({
            where: { name: req.params.name },
            include: [
            {
                model: MeetGreet,
                    as: "meet_greets",
                    attributes: { exclude: ["band_id", "event_id"] },
                    include: {
                        model: Event,
                        as: "event",
                        where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%`} }
                    }
            },
            {
                model: SetTime,
                as: "set_times",
                attributes: { exclude: ["band_id", "event_id"]},
                include: {
                    model: Event,
                    as: "event",
                    where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%`} }
                }
            }
            ],
            order: [
                [{ model: MeetGreet, as: "meet_greets" }, { model: Event, as: "event" }, 'date', 'DESC'],
                [{ model: SetTime, as: "set_times" }, {model: Event, as: "event" }, 'date', 'DESC']
            ]
        })
        res.status(200).json(foundBands)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE A BAND
bands.post('/', async (req, res) => {
    try {
        const newBand = await Band.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new band',
            data: newBand
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

//UPDATE A BAND
bands.put('/:id', async (req, res) => {
    try {
        const updateBands = await Band.update(req.body, {
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updateBands} band(s)`
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

//DELETE A BAND 
bands.delete('/:id', async (req, res) => {
    try {
        const deleteBands = await Band.destroy({
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deleteBands} band(s)`
        })
    } catch (err) {
        res.status(500).json(err)
    }
})
//EXPORT
module.exports = bands
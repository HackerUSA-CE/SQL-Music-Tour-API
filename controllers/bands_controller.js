const bands = require('express').Router()
const db = require('../models')
const { Band } = db
const { Op } = require('sequelize')

// ! CREATE
// * Create a band
bands.post('/', async(req, res) => {
    try {
        const newBand = await Band.create(req.body)
        res.status(200).json({
            data: newBand,
            message: 'New band created'
        })
    } catch(e) {
        res.status(500).json(e)
    }
})



// ! READ
// * Find all bands
bands.get('/', async (req, res) => {
    try {
        const foundBands = await Band.findAll({
            attributes: [
                ['name','band_name'],
                ['available_start_time','start_time'],
                'end_time'
            ],
            order: [['available_start_time','ASC']],
            where: {
                name: {
                    [Op.like]: `%${ req.query.name ? req.query.name : '' }%`
                },
                genre: {
                    [Op.like]: `%${ req.query.genre ? req.query.genre: '' }%`
                },
                // TODO: fix recommendation filter
                // recommendation: {
                //     [Op.like]: `${ req.query.rec ? '%' : '' }`
                // }
            }
        })
        res.status(200).json(foundBands)
    } catch(e) {
        res.status(500).json(e)
    }
})
// * Find one band
bands.get('/:id', async (req, res) => {
    try {
        const foundBand = await Band.findOne({
            where: {band_id: req.params.id}
        })
        res.status(200).json(foundBand)
    } catch(e) {
        res.status(500).json(e)
    }
})



// ! UPDATE
// * Update one band
bands.put('/:id', async(req, res) => {
    try {
        const updatedBands = await Band.update(req.body,{
            where: {band_id: req.params.id}
        })
        res.status(200).json({
            message: `Updated ${updatedBands} bands`
        })
    } catch(e) {
        res.status(500).json(e)
    }
})


// ! DELETE
// * Delete one band
bands.delete('/:id', async(req, res) => {
    try {
        const deletedBands = await Band.destroy({
            where: {band_id: req.params.id}
        })
        res.status(200).json({
            message: `Deleted ${deletedBands} bands`
        })
    } catch(e) {
        res.status(500).json(e)
    }
})



module.exports = bands

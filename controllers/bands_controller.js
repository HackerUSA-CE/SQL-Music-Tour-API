const bands = require('express').Router()
const db = require('../models')
const { Band } = db


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
        const foundBands = await Band.findAll()
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

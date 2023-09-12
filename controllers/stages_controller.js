// DEPENDENCIES
const stages = require('express').Router()
const{ Op } =require('sequelize')
const db = require('../models')
const { Stage } = db
//Mandeep
// FIND ALL stages
stages.get('/', async (req, res) => {
  try {
    const foundStages = await Stage.findAll({
    order:[['date', 'ASC']],
    
    })
    res.status(200).json(foundStages)
  }
  catch (error) {
    res.status(500).json(error)
  }
})

// FIND A SPECIFIC stages
stages.get('/:id', async (req, res) => {
  try {
    const foundStages = await Stage.findOne({
      where: {stage_id: req.params.id}
    })
    res.status(200).json(foundStages)
  }
  catch (error) {
    res.status(500).json(error)
  }
})

// CREATE A stages
stages.post('/', async (req, res) => {
  try {
    const newStages = await Stage.create(req.body)
    res.status(200).json({
      message: 'Successfully make stages',
      data: newStages
    })
  }
  catch (error) {
    res.status(500).json(error)
  }
})

// UPDATE A BAND
stages.put('/:id', async (req, res) => {
  try {
    const updatedStages = await Stage.update(req.body, {
      where: {
        stages_id: req.params.id
      }
    })
    res.status(200).json({
      message: `Successfully updated ${updatedStages} stage(s)`
    })
  }
  catch (err) {
    res.status(500).json(err)
  }
})

// DELETE A BAND
stages.delete('/:id', async (req, res) => {
  try {
    const deletedStages = await Stages.destroy({
      where: {
        stages_id: req.params.id
      }
    })
    res.status(200).json({
      message: `Successfully deleted ${deletedStages} stage(s)`
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

// EXPORT
module.exports = stages
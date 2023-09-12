// DEPENDENCIES
const events = require('express').Router()
const{ Op } =require('sequelize')
const db = require('../models')
const { Event } = db

//ROUTES
// FIND ALL EVENTS
events.get('/', async (req, res) => {
  try {
    const foundEvent = await Event.findAll({
    order:[['date', 'ASC']],
    
    })
    res.status(200).json(foundEvent)
  }
  catch (error) {
    res.status(500).json(error)
  }
})

// FIND A SPECIFIC Event
events.get('/:id', async (req, res) => {
  try {
    const foundEvent = await Event.findOne({
      where: {event_id: req.params.id}
    })
    res.status(200).json(foundEvent)
  }
  catch (error) {
    res.status(500).json(error)
  }
})

// CREATE A Event
events.post('/', async (req, res) => {
  try {
    const newEvent = await Event.create(req.body)
    res.status(200).json({
      message: 'Successfully inserted a new events',
      data: newEvent
    })
  }
  catch (error) {
    res.status(500).json(error)
  }
})
// syntex to create event
//{
  //"name":"EventName",


//}

// UPDATE A EVENTS
events.put('/:id', async (req, res) => {
  try {
    const updatedEvent = await Event.update(req.body, {
      where: {
        event_id: req.params.id
      }
    })
    res.status(200).json({
      message: `Successfully updated ${updatedEvent} event(s)`
    })
  }
  catch (err) {
    res.status(500).json(err)
  }
})

// DELETE A Events
events.delete('/:id', async (req, res) => {
  try {
    const deletedEvent = await Event.destroy({
      where: {
        event_id: req.params.id
      }
    })
    res.status(200).json({
      message: `Successfully deleted ${deletedEvent} event(s)`
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

// EXPORT
module.exports = events
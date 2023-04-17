// DEPENDENCIES
const express = require('express')
const app = express()
const { Sequelize } = require('sequelize')

// CONFIGURATION / MIDDLEWARE
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// SEQUELIZE CONNECTION
const sequelize = new Sequelize(process.env.PG_URI)
sequelize.authenticate()
    .then(() => {
        console.log(`You are connected: ${process.env.PG_URI}`)
    })
    .catch(err => {
        console.log(`Unable to connect: ${err}`)
    })

// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello. You should not be here.'
    })
})

// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`🎸 Rockin' on port: ${process.env.PORT}`)
})
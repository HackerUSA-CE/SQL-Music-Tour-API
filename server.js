const express = require('express');
const app = express();
const { Sequelize } = require('sequelize');

require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Tour API',
    });
});

const bandsController = require('./controllers/bands_controller');
app.use('/bands', bandsController);

const eventsController = require('./controllers/events_controller');
app.use('/events', eventsController);

const stagesController = require('./controllers/stages_controller');
app.use('/stages', stagesController);

app.listen(process.env.PORT, () => {
    console.log(`🎸 Rockin' on port: ${process.env.PORT}`);
});

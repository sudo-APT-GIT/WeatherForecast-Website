const path = require('path') //core node module
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs') //tell express which templeting engine we use to create dynamic template
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

// Render Dynamic pages
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Shreya Pai'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Shreya'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Hola! Wassup bud?',
        name: 'Shreya Pai',
        title: 'Help'
    })
})

// app.com/weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address!'
        })
    }
    const address = req.query.address
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, { description: desc, temperature: temp, feelslike } = {}) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: desc + ". The actual temperature is " + temp + " deg Fahrenheit but it feels like " + feelslike + " deg Fahrenheit.",
                location,
                address
            })
        })
    })
})


app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        errorr: 'Help article not found :/',
        name: 'Shreya Pai'
    })
})

// Route Handler for a 404 page
app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        errorr: 'Page not found :/',
        name: 'Shreya Pai'
    })
})

// Start up the server
app.listen(port, () => {
    console.log('Server is up on port ' + port)
}) //3000 is a common development port ( open a tab with http://localhost:3000/)

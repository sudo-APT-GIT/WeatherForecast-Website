const request = require('request')


const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3ae9c589d6193624185cc62304296aca&query=' + lat + ',' + lon +'&units=f'
    
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to internet services! :/', undefined)
        } else if (body.error) {
            callback('Unable to find the loction!:(', undefined)
        }
        else {
            const cur = body.current
            const data = {
                temperature: cur.temperature,
                feelslike: cur.feelslike,
                description: cur.weather_descriptions[0]
            }
            callback(undefined, data)
        }
    })
}

module.exports = forecast

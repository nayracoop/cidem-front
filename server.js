const express = require('express')
const history = require('connect-history-api-fallback')
const app = express()

app.use(history())
app.use(express.static('dist'))

app.listen(8089, function () {
    console.log('App listening in port 8089')
})

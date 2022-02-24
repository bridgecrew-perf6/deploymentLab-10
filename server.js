const express = require('express')
const path = require('path')

const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: 'f1df417be2f64970af7eae67262d7f41',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

const app = express()

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/css', (req, res) => { // the /css is the stupid thing to remember
    res.sendFile(path.join(__dirname, './style.css'))
})
const port = process.env.PORT || 4004

app.listen(port, () =>{
    console.log(`Listening on port ${port}`)
})
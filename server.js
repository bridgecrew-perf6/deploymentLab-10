const express = require('express')
const path = require('path')
const app = express()

const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: 'f1df417be2f64970af7eae67262d7f41',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')
app.use(express.json())

let students = []

app.post('/api/student', (req, res)=>{
    let {name} = req.body
    name = name.trim()

    const index = students.findIndex(studentName=> studentName === name)

    if(index === -1 && name !== ''){
        students.push(name)
        rollbar.log('Student added successfully', {author: 'Scott', type: 'manual entry'})
        res.status(200).send(students)
    } else if (name === ''){
        rollbar.error('No name given')
        res.status(400).send('must provide a name.')
    } else {
        rollbar.error('student already exists')
        res.status(400).send('that student already exists')
    }

})

app.use(rollbar.errorHandler())

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
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
// const http = require('http')
// var https = require('https')
var fs = require('fs')

// var privateKey = fs.readFileSync('./selfsigned.key', 'utf8')
// var certificate = fs.readFileSync('./selfsigned.crt', 'utf8')

// var httpServer = http.Server(app)
// var httpsServer = https.Server(credentials, app)

//var credentials = { key: privateKey, cert: certificate }
const helmet = require('helmet')
const { exec } = require('child_process')

app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  next()
})

//pre-flight requests
app.options('*', function(req, res) {
  res.send(200)
})

// httpServer.listen(3000, err => {
//   if (err) {
//     throw err
//   }
//   /* eslint-disable no-console */
//   console.log('server running')
// })

app.listen(3000, err => {
  if (err) {
    throw err
  }
  /* eslint-disable no-console */
  console.log('server running')
})

app.get('/', (req, res) => {
  res.status(200)
  res.json({ hello: 'hi' })
  res.end()
})

app.post('/', (req, res) => {
  var id = req.body.id
  var data = req.body.data
  var imgSize = req.body.imgSize

  exec(
    `./darknet classifier one_label cfg/imagenet1k.data cfg/darknet19.cfg darknet19.weights ${id} ${data} ${imgSize}`,
    (err, stdout, stderr) => {
      if (err) {
        res.json({ err: err, stderr: stderr })
        res.end()
      } else {
        res.status(200)

        console.log(`${stdout}`)
        res.json({ score: stdout })
        res.end()
      }
    }
  )
})

// current status: run the index and upload an image while sshd into the server.
// it will give u an error and then u gotta fix it
// either cant send such a long array through the command line to darknet or need to edit darknet code to handle the right size
// try a command with full set of image data to darknet not through the server

module.exports = app

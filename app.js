const path = require('path')

const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const morgan = require('morgan')
const { createServer } = require('http')
const routes = require('./routes')

const URI = process.env.MONGO_URI
const PORT = process.env.PORT || 5000

const main = async () => {
  try {
    // Mongo Connection
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Connected to MongoDB')
  } catch (err) {
    console.log('Error connecting to MongoDB:', err.message)
  }

  // App Server
  const app = express()
  const httpServer = createServer(app)

  // Middlewares
  app.use(express.json())
  app.use(cookieParser())
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
      originAgentCluster: true,
      referrerPolicy: {
        policy: 'no-referrer-when-downgrade',
      },
    })
  )

  app.use(
    helmet.contentSecurityPolicy({
      useDefaults: true,
      directives: {
        'img-src': ["'self'", 'https: data: blob:'],
        'default-src': ["'self'", 'https://*'],
        'connect-src': ["'self'", 'https://*', 'wss://*', 'data: blob:'],
        'script-src': ["'self'", 'https: data: blob: https://*'],
      },
    })
  )

  app.use(cors())
  app.use(morgan('dev'))

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.use('/api', routes)

  // error handler
  app.use(function (err, req, res, next) {
    console.log(err)
    res.sendStatus(err.status || 500)
  })

  process.on('unhandledRejection', (error) => {
    console.log('unhandledRejection', error)
  })

  process.on('uncaughtException', (error) => {
    console.log('uncaughtException', error)
  })

  app.use(
    express.urlencoded({
      extended: true,
    })
  )

  app.use(express.static(path.join(__dirname, '/client/dist')))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/dist', 'index.html'))
  })

  httpServer.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}

main().then(() => console.log('SUCCESS STARTING SERVER'))

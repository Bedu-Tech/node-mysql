// import express from 'express'
// import bodyParser from 'body-parser'
const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

// Initialized express
const app = express()
const port = process.env.PORT || 8080

// Connection to database
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'mydb'
})

// Parsing requests
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Routing
const router = express.Router()

// /api/
router.get('/', (req, res) => {
  res.json({ message: 'Cool! Node with Express API'})
})

// /api/artist
router.get('/artist', (req, res) => {
  connection.connect()
  connection.query('SELECT * FROM artistas', (err, results, fields) => {
    if (err) res.json({ error: err })
    res.json({
      data: results
    })
  })
  connection.end()
})

// /api/artist/:id
router.get('/artist/:id', (req, res) => {
  const { id } = req.params
  connection.connect()
  connection.query(`SELECT * FROM artistas WHERE id = ${id}`, (err, results, fields) => {
    if (err) res.json({ error: err })
    res.json({
      data: results
    })
  })
  connection.end()
})

// Prefix API
app.use('/api', router)

app.listen(port)
console.log(`API listening on port ${port}`)
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 9999

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'items'




app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.listen(PORT, () => {
    console.log("listening on 9999")
})
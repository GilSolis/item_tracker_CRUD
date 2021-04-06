const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 9999
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'items'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} DB`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', async (req, response) => {
    let collectionData = await db.collection('items').find().toArray()
    response.render('index.ejs', { data: collectionData })
})

app.post('/addItem', (request, response) => {
    console.log(request.body)
    db.collection('items').insertOne(request.body)
        .then(result => {
            console.log("Item Added")
            response.redirect('/')
        })
})

app.listen(PORT, () => {
    console.log("listening on 9999")
})
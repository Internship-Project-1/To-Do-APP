const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require("cors"); //cross origin support


const router = require('./routes/api/index')

const app = express()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json())


app.use('/api', router)

router.use('/status', (req, res) => {
    res.json({
        "status": "healthy",
        "timestamp": new Date(),
    })
})

app.use('/', (req, res) => {
    res.send("<h1>Authenticator App backend server</h1>");
})

//Import Datbase URL
var db = require("./config/conn").url;

const PORT = process.env.PORT || 3000

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>
        app.listen(PORT, () => {
            console.log(`Server is running on PORT ${PORT}`)
        })
    )

    .catch((error) => console.log(`${error} did not connect`))











const express = require('express')
const path = require('path')
const app = express()

var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

const port = 3000

const buttonsState = {}

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
})

app.post('/update_values', (req, res) => {
    try {
        if (!buttonsState[req.body.column]) {
            buttonsState[req.body.column] = {
                pressed: true,
                value: req.body.value
            }
        } else {
            if (buttonsState[req.body.column].pressed) {
                buttonsState[req.body.column].pressed = false
                buttonsState[req.body.column].value = req.body.value
            } else {
                buttonsState[req.body.column].pressed = true
                buttonsState[req.body.column].value = req.body.value
            }

        }
        res.sendStatus(200);

        // console.log(buttonsState, req.body)
    } catch (e) {
        res.sendStatus(500);
        console.log(e)
    }

})

app.get('/buttonsState', (req, res) => {

    try {
        res.send(buttonsState)
    } catch (error) {
        console.log(error)
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
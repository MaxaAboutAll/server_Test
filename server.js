const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/notes', (req, res) => {
    res.send('Her tebe v ochko');
});
MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)
    require('./routes')(app, database);
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
})

var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {
    app.post('/notes', (req, res) => {
        const note = { text: req.body.body, title: req.body.title, children: ["Jenya", "Voron"] };
        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });
    app.get('/notes/', (req, res) => {
        //const id = req.params.id;
        //const details = { '_id': new ObjectID(id) };
        /*db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(item);
            }
        });*/
        db.collection('notes').findOne({ 'children': 'Jenya' }, (err, item) => {
            if (err) {
                res.send(err);
            } else {
                res.send(item.children);
            }
        });
    });
    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send('Note ' + id + ' has removed');
            }
        });
    });
    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { text: req.body.body, title: req.body.title };
        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                console.log('we have an error');
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(note);
            }
        });
    });

};
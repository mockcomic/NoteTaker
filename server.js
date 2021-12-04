const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const uniqid = require('uniqid');

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname + '/db/db.json'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});


app.put('/api/notes/:id', (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) console.error(err)
        let notes = JSON.parse(data);
        let select = notes.find((element) => element.id === req.params.id);
        if (select) {
            let update = {
                title: req.body.title,
                text: req.body.text,
                id: select.id
            };
            notes.splice(notes.indexOf(select), 1, update);
            fs.writeFile('./db/db.json', JSON.stringify(notes), err => {
                if (err) console.error(err);
            });
            return res.send();
        };
    });
});

app.post('/api/notes', (req, res) => {
    const {title,text} = req.body;
    if (title && text) {
        fs.readFile(`./db/db.json`, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const notes = JSON.parse(data);
                notes.push({
                    title,
                    text,
                    id: uniqid()
                });
                fs.writeFile(`./db/db.json`, JSON.stringify(notes), err => {
                    if (err) console.error(err);
                });
            }
        });
        res.json({
            body: {
                title,
                text,
                id: uniqid()
            }
        });
    } else {
        console.error(err)
    };
});

app.delete('/api/notes/:id', (req, res) => {
    fs.readFile(`./db/db.json`, 'utf8', (err, data) => {
        if (err) console.error(err);
        let notes = JSON.parse(data);
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].id === req.params.id) {
                notes.splice(i, 1);
            }
        };
        fs.writeFile(`./db/db.json`, JSON.stringify(notes), (err) => {
            if (err) console.error(err);
        });
        return res.send();
    });
});


app.listen(PORT, () => {
    console.log(`API server now on port http://localhost:${PORT}/`);
});
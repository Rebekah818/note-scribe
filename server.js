// Require files
const express = require('express');
const fs = require('fs');
const database = require('mime-db');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Server
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const  writeNotes = (notes) => {
    return fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(notes));  

};

const getNotes = () => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, './db/db.json'), 'utf8'))
};

// API GET request
app.get('/api/notes', async function (req, res) {
    const notes = await getNotes()
    res.json(notes)
});

// POST request
app.post('/api/notes', async function ({ body }, res) {
    try{
    const notes = await getNotes()

    const { title, text } = body
    const newNote = {
        title, text, id: uuidv4()
    }
    notes.push(newNote);
    console.log(notes);
    await writeNotes(notes);
    
    res.json(newNote);
}
    catch(err) {
        console.error(err)
    }
});



// DELETE request



//HTML routes
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});



// Listener
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});













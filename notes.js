//console.log('notes.js Started!');

const fs = require('fs');

var fetch = () => {
    try {
        var tempNotes = fs.readFileSync('notes-data.json');
        var notes = JSON.parse(tempNotes);
        return notes;
    }catch (err) { return [];}
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
    var notes = [];
    var note = {
        title,
        body
    };

    notes = fetch();
    
    var checkDuplicates = notes.filter((note) => note.title === title);

    if(checkDuplicates.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return true;
    }
    return false;
};

var listAll = () => {
    console.log('Titles of notes :');
    var notes = fetch();
    var i = 0;
    for (let s of notes) {
        console.log((++i) +'. '+ s.title);
    }
};

var readNote = (title) => {
    var notes = fetch();
    var requiredNote = notes.filter((note) => note.title === title);
    if (requiredNote.length === 1) {
        console.log('Found Note!');
        console.log(`Title : ${requiredNote[0].title}`);
        console.log(`Content : ${requiredNote[0].body}`);
        return true;
    }
    return false;
};

var removeNote = (title) => {
    var notes = fetch();
    var filteredNotes = notes.filter((note) => note.title !== title);
    if (filteredNotes.length !== notes.length) {
        saveNotes(filteredNotes);
        return true;
    }
    return false;
};

module.exports = {
    addNote,
    listAll,
    readNote,
    removeNote
};

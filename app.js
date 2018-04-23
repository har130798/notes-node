'use strict';

//console.log('Starting app.js!');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

var titleOptions = {
    describe: 'title of the note',
    demand: true,
    alias: 't'
};

var bodyOptions = {
    describe: 'body of the note',
    demand: true,
    alias: 'b'
};
var command = process.argv[2];

//console.log(process.argv);

var args = yargs
    .command('add', 'Add new notes', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {title: titleOptions})
    .command('remove', 'Remove a note', {title: titleOptions})
    .help()
    .argv;

//console.log(args);

if (command === 'add') {
    var status = notes.addNote(args.title, args.body);
    var message = status ? `Added note! Title : ${args.title}` : 'Failed to add note';
    console.log(message);
} else if (command === 'read') {
    var status = notes.readNote(args.title);
    var message = status ? 'Successfully read' : 'Note not found';
    console.log(message);
    
} else if (command === 'list') {
    notes.listAll();
} else if (command === 'remove') {
    var status = notes.removeNote(args.title);
    var message = status ? `Removed note! Title : ${args.title}` : 'Note not found';
    console.log(message);
} else {
    console.log('Command not recognized');
}

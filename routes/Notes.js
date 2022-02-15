const router = require('express').Router();
let Note = require('../models/note.model');

// Get all notes
router.route('/').get(async (req, res) => {
    const notes = await Note.find({});
    // const notes = await Note.find({email: req.query.email});
    res.send(notes);
});

// Create a Note
router.route('/add').post((req, res) => {
    const Title = req.body.Title;
    const Content = req.body.Content;

    const newNote = new Note({Title, Content});

    newNote.save()
        .then(() => res.json('Note added'))
        .catch(err => res.status(400).json('Error: '+err))
});

// Delete a Note
router.route('/delete/:id').delete((req, res) => {
    Note.findByIdAndDelete(req.params.id)
        .then(() => res.json('Note deleted'))
        .catch(err => res.status(400).json('Error: '+err))
});

// Update a Note
router.route('/update/:id').post((req, res) => {
    Note.findById(req.params.id)
        .then(note => {
            note.Title = req.body.Title;
            note.Content = req.body.Content;

            note.save()
                .then(() => res.json('Note updated'))
                .catch(err => res.status(400).json('Error: '+err))
        })
        .catch(err => res.status(400).json('Error: '+err))
}); 

module.exports = router;
// controller is for CRUD
// import the model to use queries 
const Note = require("../model/note");

module.exports = {

    // READ ALL
    findAll: (req, res) => {
        Note.find()
            .then( (notes) => {
                // 🆘 
                console.log(notes);
                // return res.json({all_notes: notes, status: "ok"})
                return res.json(notes)
            })
            .catch( err => res.json(err))
    },

    // CREATE
    create: (req, res) => {
        // pass in body data
        console.log(req.body);
        Note.create(req.body)
            .then( newNote => {
                console.log("DB Success created new Note");
                return res.json(newNote)
            })
            .catch(err => {
                console.log("DB ERROR crating note");
                return res.json(err)
            })
    },

    // READ ONE
    findOne: (req, res) => {
        console.log(req.params);
        // Note.findOne({_id : req.params.id})
        Note.findById(req.params.id)
            .then(note => res.json(note))
            .catch(err => res.json(err))
    },

    // UPDATE
    update: (req, res) => {
        console.log("UPDATE id:", req.params.id);
        console.log("UPDATE OBJ:", req.body);
        // Note.findOneAndUpdate({_id: req.req.params.id})
        Note.findByIdAndUpdate(req.params.id, req.body, {
            new: true, runValidators: true
        })
            .then(updatedNote => res.json(updatedNote))
            .catch(err => res.json(err))
    },


    // DELETE
    delete: (req, res) => {
        console.log(req.params.id);
        Note.findByIdAndDelete(req.params.id)
            .then(result => res.json(result))
            .catch(err => res.json(err))
    }
 









}
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import noteStyle from "./Main.module.css";
import { Link } from 'react-router-dom'

const Main = (props) => {

    const [notes, setNotes] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/notes")
            .then(res => {
                console.log(res.data);
                setNotes(res.data);
            })
            .catch(err => console.log(err))
    }, [])

    // DELETE
    const deleteNote = (deleteId) => {
        // console.log(deleteId);
        axios.delete("http://localhost:8000/api/notes/" + deleteId)
            .then(res => {
                console.log(res.data);
                console.log("DELETE SUCCESS!");

                // remove from the DOM after a successful delete
                setNotes(notes.filter( (note) => note._id !== deleteId));
            })
            .catch(err => console.log(err))
    }


    return (
        <div>
            <h2>all the notes</h2>
            <hr />
            {/* {JSON.stringify(notes)} */}
            {
                notes.map((note, idx) => {
                    return (
                        <div key={note._id} className={noteStyle.note}>
                            <h5>
                                <Link to={`/notes/${note._id}`}>
                                    {note.isImportant ? "📌" : ""}
                                    {note.title}
                                </Link>
                            </h5>
                            <p>
                                {note.content}
                            </p>
                            <span>{note.createdAt}</span><br />
                            <button>
                                <Link to={"/update/"+note._id}>Edit</Link>
                            </button>
                            <button onClick={() => deleteNote(note._id)}>delete</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Main
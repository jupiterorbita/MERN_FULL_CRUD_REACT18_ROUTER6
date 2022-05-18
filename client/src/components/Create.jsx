import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Create = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [isImportant, setIsImportant] = useState(false)

    const createNote = (e) => {
        e.preventDefault()
        
        const newNote = {
            title: title,
            content,
            isImportant
        }
        console.log(newNote);
        
        // POST to the DB with the obj
        axios.post("http://localhost:8000/api/notes", newNote)
            .then(res => {
                console.log(res.data);
                console.log("CLIENT SUCCESS!!!!");
                navigate("/notes");
            })
            .catch(err => {
                // TODO: when errors come from Server!
                console.log("❌ CLient ERROR");
                console.log(err);
            })
    }

    return (
        <div>
            <p>
                {JSON.stringify(title)} <br />
                {JSON.stringify(content)} <br />
                {JSON.stringify(isImportant)}<br />
            </p>
            <form onSubmit={createNote}>
                title: <input onChange={(e) => setTitle(e.target.value)} value={title} /> <br />
                
                content: <input onChange={(e) => setContent(e.target.value)} value={content} /> <br />
                
                <input type="checkbox" onChange={(e) => setIsImportant(e.target.checked)} checked={isImportant} /> is this important?<br />
                
                <button>Create</button>
            </form>

        </div>
    )
}

export default Create
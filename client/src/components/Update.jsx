import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const Update = (props) => {
    const navigate = useNavigate();

    const {id} = useParams();

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [isImportant, setIsImportant] = useState(false)

    // get the data from the DB and put it in state to have the form pre-filled
    useEffect(() => {
        axios.get("http://localhost:8000/api/notes/" + id)
            .then(res => {
                console.log(res.data);
                setTitle(res.data.title)
                setContent(res.data.content)
                setIsImportant(res.data.isImportant)
            })
            .catch(err => console.log(err))
    }, [id])

    const updateNote = (e) => {
        e.preventDefault()

        const updatedNote = {
            title: title,
            content,
            isImportant
        }
        console.log(updatedNote);

        // POST to the DB with the obj
        axios.put("http://localhost:8000/api/notes/"+ id, updatedNote)
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
            <form onSubmit={updateNote}>
                title: <input onChange={(e) => setTitle(e.target.value)} value={title} /> <br />

                content: <input onChange={(e) => setContent(e.target.value)} value={content} /> <br />

                <input type="checkbox" onChange={(e) => setIsImportant(e.target.checked)} checked={isImportant} /> is this important?<br />

                <button>Create</button>
            </form>

        </div>
    )
}

export default Update
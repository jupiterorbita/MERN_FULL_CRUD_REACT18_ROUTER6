import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

const thisComponentStyle = {
    width: "60%",
    margin: "0 auto",
    textAlign: "left",
    backgroundColor: "rgb(255, 229, 153)",
    padding: "10px 20px",
    borderRadius: "10px"
}

const ViewOne = (props) => {

    // grab the variable from the url :id :var :whatever
    const { id } = useParams();
    console.log(id);

    const [thisNote, setThisNote] = useState(null)

    useEffect(() => {
        axios.get("http://localhost:8000/api/notes/" + id)
            .then(res => {
                // always look at what the server is coming back as BEFORE you set the state var
                console.log(res.data);
                setThisNote(res.data)
            })
            .catch(err => console.log(err))
    }, [id])

    return (
        <>
            {
                thisNote ? (
                    <div style={thisComponentStyle} >
                        <h3>{thisNote.isImportant ? "📌" : ""} - {thisNote.title}</h3>
                        <p>{thisNote.content}</p>
                        <p>{thisNote.createdAt}</p>
                        {/* {JSON.stringify(thisNote)} */}
                    </div >
                ) : "loading..."
            }
        </>
    )
}

export default ViewOne
import { useOutletContext, useNavigate } from "react-router-dom";
import { useState } from "react";

import DeleteIcon from "../../icons/deleteIcon";
import EditIcon from "../../icons/editIcon";
import "./notes.sass";

function Notes() {
    const [context, setContext] = useOutletContext()
    const navigate = useNavigate();
    
    const [state, setState] = useState({
        display: false,
        title: "Title",
        text: "",
    });
    
    const display_notes = context.notes.map((item, index, arr) => {
        if (item.deleted) return null
        return (
            <div className="note_div" key={Math.random()+item.text}>
                <div className="note_head">
                    <span 
                        style={{backgroundColor: item.category.color }}
                        className="category"
                    />
                    <span className="row">
                        <span className="title">Title</span>
                        <span className="icons">
                            <span
                                onClick={() => {
                                    arr[index].deleted = true;
                                    setContext({
                                        ...context,
                                        notes: arr,
                                    });
                                    navigate("/create", {state: {
                                        key: "note",
                                        note: item,
                                    }});
                                }}
                            >
                                <EditIcon className="edit_note_icon" />
                            </span>
                            <span
                                onClick={() => {
                                    arr[index].deleted = true;
                                    setContext({
                                        ...context,
                                        notes: arr,
                                    });
                                }}
                            >
                                <DeleteIcon className="delete_icon" />
                            </span>
                        </span>
                    </span>
                </div>
                <div
                    className="note_body"
                    onClick={() => {
                        setState({
                            ...state,
                            display: !state.display,
                            text: item.text,
                        })
                    }}
                >
                    {item.text}
                </div>
            </div>
        )
    })
    
    return (
        <div className="notes">
            <span className="text">
                Your Notes<br />
                <span>Category: {context.notes_category}</span>
            </span>
            <div className="note_container">
                {display_notes.reverse()}
            </div>
            <div
                style={{display: state.display ? "flex" : "none"}}
                className="full_text"
            >
                <div className="inner_div">
                    <span className="title_span">
                        {state.title}
                    </span>
                    {state.text}
                </div>
            </div>
        </div>
    )
}

export default Notes
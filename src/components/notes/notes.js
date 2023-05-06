import { useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

import DeleteIcon from "../../icons/deleteIcon";
import EditIcon from "../../icons/editIcon";
import "./notes.sass";

function Notes() {
    const notes = useSelector((state) => state.notes);
    const navigate = useNavigate();

    const [state, setState] = useState({
        display: false,
        title: "Title",
        text: "",
    });

    const display_notes = notes.map((item, index, arr) => {
        if (item.deleted) return null;
        return (
            <div className="note_div" key={Math.random() + item.text}>
                <div className="note_head">
                    <span
                        style={{ backgroundColor: item.category.color }}
                        className="category"
                    />
                </div>
                <div
                    className="note_body"
                    onClick={() => {
                        setState({
                            ...state,
                            display: !state.display,
                            text: item.text,
                        });
                    }}
                >
                    <span className="header_section">
                        <span className="category_text">
                            {item.category.name}
                        </span>
                        <span
                            onClick={() => {
                                arr[index].deleted = true;
                                setContext({
                                    ...context,
                                    notes: arr,
                                });
                                navigate("/create", {
                                    state: {
                                        key: "note",
                                        note: item,
                                    },
                                });
                            }}
                        >
                            <EditIcon className="edit_note_icon" />
                        </span>
                    </span>
                    <span className="body_section">
                        <span className="title">Title</span>
                        <span className="text_span">{item.text}</span>
                    </span>
                    <div className="footer">
                        <div className="hr" />
                        <span className="date_container">
                            <span className="date">
                                {" "}
                                {item.date.toDateString()}
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
                                Delete
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className="notes">
            <span className="text">
                Notes
                <br />
                <span>Category: {context.notes_category}</span>
            </span>
            <div className="note_container">{display_notes.reverse()}</div>
            <div
                style={{ display: state.display ? "flex" : "none" }}
                className="full_text"
            >
                <div className="inner_div">
                    <span className="title_span">{state.title}</span>
                    {state.text}
                </div>
            </div>
            <Outlet />
        </div>
    );
}

export default Notes;

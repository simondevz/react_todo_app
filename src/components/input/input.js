import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { updateTasks, updateNotes, updateCategory } from "../../action";
import Edit from "../edit/edit";
import "./input.sass";

function Input() {
    let tasks = useSelector((state) => state.tasks);
    let notes = useSelector((state) => state.notes);
    let categories = useSelector((state) => state.categories);
    const dispatch = useDispatch();

    const location = useLocation();
    const navigate = useNavigate();
    const addCategoryRef = useRef(null);
    const key = location.state.key;

    if (!key) navigate("/");
    const [state, setState] = useState({
        task: {
            text: "",
            done: false,
            category: {
                name: "Personal",
                color: "blue",
            },
        },
        note: {
            text: location.state?.note ? location.state.note.text : "",
            deleted: false,
            category: location.state?.note
                ? location.state.note.category
                : {
                      name: "Personal",
                      color: "blue",
                  },
        },
        custom_category: {
            name: "",
            color: "#000000",
        },
    });

    const options = categories.map((item) => {
        return (
            <option value={JSON.stringify(item)} key={Math.random()}>
                {item.name}
                {/*<span className="color" />*/}
            </option>
        );
    });

    function handleSubmit(event) {
        event.preventDefault();

        if (key === "note") {
            notes = [...notes, state.note];
            dispatch(updateNotes(notes));
        } else {
            tasks = [...tasks, state.task];
            dispatch(updateTasks(tasks));
        }

        setState({
            ...state,
            [key]: {
                ...state[key],
                text: "",
            },
        });
        navigate(`/${key}s`);
    }

    function handleInputChange(event) {
        setState({
            ...state,
            [key]: {
                ...state[key],
                text: event.target.value,
                date: new Date(),
            },
        });
    }

    return (
        <div
            onClick={(event) => {
                console.log(event.target);
            }}
            className="input"
        >
            <form className="input_form" onSubmit={handleSubmit}>
                <span>
                    <label htmlFor="textarea">
                        {key === "task" ? "Task: " : "Note: "}
                    </label>
                    <input
                        type="text"
                        id="textarea"
                        className="textarea"
                        value={state[key].text}
                        onChange={handleInputChange}
                        autoFocus
                    />
                </span>
                <span>
                    <label htmlFor="category">Category: </label>
                    <select
                        name="category"
                        id="category"
                        className="form_category"
                        value={JSON.stringify(state[key].category)}
                        onChange={(event) => {
                            if (event.target.value === "Add category") {
                                addCategoryRef.current.style.display = "flex";
                                return;
                            }

                            setState({
                                ...state,
                                [key]: {
                                    ...state[key],
                                    category: {
                                        name: JSON.parse(event.target.value)
                                            .name,
                                        color: JSON.parse(event.target.value)
                                            .color,
                                    },
                                },
                            });
                        }}
                    >
                        {options}
                        <option>Add category</option>
                    </select>
                </span>
                <button
                    className="addTask_button"
                    style={{
                        background: "#051956",
                        height: "2rem",
                        width: "7rem",
                        borderRadius: ".75rem",
                        position: "relative",
                        left: "10rem",
                        border: "none",
                        outline: "none",
                        color: "#F2FFFF",
                        margin: "1.2rem",
                    }}
                >
                    {key === "task" ? "Add Task" : "Make Note"}
                </button>
            </form>
            <div ref={addCategoryRef} className="addCategoryDiv">
                <form
                    className="form_addCategory"
                    onSubmit={(event) => {
                        event.preventDefault();
                        addCategoryRef.current.style.display = "none";
                        if (state.custom_category.name === "") return;

                        categories = [...categories, state.custom_category];
                        dispatch(updateCategory(categories));
                        setState({
                            ...state,
                            custom_category: {
                                ...state.custom_category,
                                name: "",
                                color: "#000000",
                            },
                        });
                    }}
                >
                    <input
                        type="text"
                        className="nameIt"
                        placeholder="Name the Category"
                        value={state.custom_category.name}
                        onChange={(event) => {
                            setState({
                                ...state,
                                custom_category: {
                                    ...state.custom_category,
                                    name: event.target.value,
                                },
                            });
                        }}
                    />
                    <input
                        type="color"
                        className="colorIt"
                        value={state.custom_category.color}
                        onChange={(event) => {
                            setState({
                                ...state,
                                custom_category: {
                                    ...state.custom_category,
                                    color: event.target.value,
                                },
                            });
                        }}
                    />
                    <button
                        className="cancel-form"
                        onClick={() => {
                            setState({
                                ...state,
                                custom_category: {
                                    ...state.custom_category,
                                    name: "",
                                },
                            });
                        }}
                    >
                        Cancel
                    </button>
                    <button>Add</button>
                </form>
            </div>
            <Edit pathName="." />
        </div>
    );
}

export default Input;

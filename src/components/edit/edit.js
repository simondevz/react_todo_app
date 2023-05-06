import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import EditIcon from "../../icons/editIcon";
import { updateTasks } from "../../action";
import "./edit.sass";

function Edit() {
    const tasks = useSelector((state) => state.tasks);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, setState] = useState({
        display: false,
    });

    function deleteTasks() {
        const remainingTasks = tasks.filter((task) => !task.done);
        dispatch(updateTasks(remainingTasks));
        navigate(0);
    }

    function onClick() {
        setState({
            ...state,
            display: !state.display,
        });
    }

    return (
        <div className="edit">
            <div
                style={{ display: state.display ? "block" : "none" }}
                className="menu"
            >
                <NavLink
                    onClick={() => {
                        onClick();
                        deleteTasks();
                    }}
                    className="delete"
                >
                    Delete Done Tasks
                </NavLink>
                <NavLink
                    className="add_note"
                    to="/notes/create"
                    state={{ key: "note" }}
                    onClick={onClick}
                >
                    Take A Note
                </NavLink>
                <NavLink
                    className="add_task"
                    to="/tasks/create"
                    state={{ key: "task" }}
                    onClick={onClick}
                >
                    Take A Task
                </NavLink>
            </div>
            <div className="editIcon_div" onClick={onClick}>
                <EditIcon className="editIcon" />
            </div>
        </div>
    );
}

export default Edit;

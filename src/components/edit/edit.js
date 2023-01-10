import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import EditIcon from "../../icons/editIcon";
import { updateTasks } from "../../action";
import "./edit.sass";

function Edit({pathName}) {
    const tasks = useSelector(state => state.tasks);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, setState] = useState({
        display: false,
    })
    
    function deleteTasks() {
        const remainingTasks = tasks.filter(task => !task.done);
        dispatch(updateTasks(remainingTasks));
        navigate(0);
    }
    
    return (
        <div className="edit" >
            <div 
                style={{display: state.display ? "block" : "none"}}
                className="menu"
            >
                <NavLink onClick={deleteTasks} className="delete">Delete Done Tasks</NavLink>
                <NavLink 
                    className="add_note"
                    to={pathName}
                    state={{key: "note"}}
                >
                    Take A Note
                </NavLink>
                <NavLink 
                    className="add_task"
                    to={pathName}
                    state={{key: "task"}}
                >
                    Take A Task
                </NavLink>
            </div>
            <div 
                className="editIcon_div"
                onClick={() => {
                    setState({
                        ...state,
                        display: !state.display,
                    })
                }}
            >
                <EditIcon className="editIcon"/>
            </div>
        </div>
    )
}

export default Edit
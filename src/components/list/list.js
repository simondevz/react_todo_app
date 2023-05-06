import { useOutletContext, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import "./list.sass";

function List() {
    const [context, setContext] = useOutletContext();
    const tasks = useSelector((state) => state.tasks);
    const [state, setState] = useState({
        tasks,
        context,
        setContext,
    });

    function calcProgress() {
        let doneTask = 0;
        for (let item of context.tasks) {
            if (item.done) doneTask++;
        }

        const progress = (doneTask / context.tasks.length) * 100;
        return doneTask === 0 ? 0 : progress.toFixed(0);
    }

    const task_list = state.tasks.map((item, index, arr) => {
        return (
            <li
                className={item.done ? "checked" : null}
                key={Math.random() + item.text}
            >
                <span
                    onClick={() => {
                        item.done = !item.done;
                        arr[index].done = item.done;
                        setState({
                            ...state,
                            tasks: arr,
                        });
                    }}
                    className="checkbox_container"
                >
                    <span
                        className="checkbox"
                        style={{
                            background: item.category.color,
                        }}
                    >
                        <span className="innerbox" />
                    </span>
                </span>
                <span className="text">{item.text}</span>
            </li>
        );
    });

    return (
        <div className="list">
            <span className="welcome_text">Welcome, User</span>
            <span className="category_text">Category</span>
            <div className="progress_bar_container">
                <p className="no_of_tasks">
                    {task_list.length} {task_list.length > 1 ? "tasks" : "task"}
                </p>
                <p className="text">{state.context.tasks_category.name}</p>
                <span
                    className="progress_bar"
                    style={{
                        backgroundImage: `linear-gradient(to right, ${
                            state.context.tasks_category.color
                        } ${calcProgress()}%, #44588D ${calcProgress()}%)`,
                    }}
                ></span>
            </div>
            <h2>Today's Tasks</h2>
            <ul className="container">{task_list}</ul>
            <Outlet />
        </div>
    );
}

export default List;

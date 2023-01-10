import { useOutletContext } from "react-router-dom";
import "./list.sass";

function List() {
    const [context, setContext] = useOutletContext();
    
    function calcProgress() {
        let doneTask = 0;
        for (let item of context.tasks) {
            if (item.done) doneTask++;
        }
        
        const progress = (doneTask/context.tasks.length) * 100;
        return doneTask === 0 ? 0 : progress.toFixed(0);
    }
    
    const task_list = context.tasks.map((item, index, arr) => {
        return (
            <li className={item.done ? "checked" : null } key={Math.random()+item.text}>
                <span 
                    onClick={() => {
                        item.done = !item.done;
                        arr[index].done = item.done;
                        setContext({
                            ...context,
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
        )
    })
    
    return (
        <div className="list">
            <span className="welcome_text">Welcome, User</span>
            <div className="progress_bar_container">
                <p className="text">Category: {context.tasks_category.name}</p>
                <span
                    className="progress_bar"
                    style={{
                        backgroundImage: `linear-gradient(to right, ${context.tasks_category.color} ${calcProgress()}%, white ${calcProgress()}%)`
                    }}
                >{calcProgress()}% done.</span>
            </div>
            <h2>Here are your tasks...</h2>
            <ul className="container">
                {task_list}
            </ul>
        </div>
    )
}

export default List
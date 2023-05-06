import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import Edit from "../edit/edit";
import FilterIcon from "../../icons/filterIcon";
import MenuIcon from "../../icons/menuIcon";
import Xicon from "../../icons/xIcon";
import "./home.sass";

// fix the input component
// fix the links in sidebar
// comment your work
function Home() {
    const tasks = useSelector((state) => state.tasks);
    const notes = useSelector((state) => state.notes);
    const location = useLocation();
    const key = location.pathname;

    const [state, setState] = useState({
        sidebar_display: false,
        filter_display: false,
    });

    const [context, setContext] = useState({
        tasks_category: {
            name: "All",
            color: "steelBlue",
        },
        notes_category: "All",
    });

    useEffect(() => {
        let body = document.querySelector("body").classList;
        if (state.sidebar_display) {
            body.add("open_menu");
        } else {
            body.remove("open_menu");
        }
    }, [state.sidebar_display]);

    function toggleSidebar() {
        setState({
            ...state,
            sidebar_display: !state.sidebar_display,
        });
    }

    // Filters out a category in the array passed to it
    function filter(arr, category) {
        if (category === "All") return null;
        let return_arr = arr.filter((item) => item.category.name === category);

        return return_arr;
    }

    return (
        <div
            className={
                state.sidebar_display ? "home home_menu_reaction" : "home"
            }
        >
            <nav>
                <span className="menu" onClick={toggleSidebar}>
                    <MenuIcon className="menu_icon" />
                </span>
                <span
                    className="filter"
                    onClick={() => {
                        console.log("clicked");
                        setState({
                            ...state,
                            filter_display: !state.filter_display,
                        });
                    }}
                >
                    <FilterIcon className="filter_icon" />
                </span>
            </nav>
            <div className={state.sidebar_display ? "sidebar open" : "sidebar"}>
                <span className="close" onClick={toggleSidebar}>
                    <Xicon className="sidebar_x" />
                </span>
                <NavLink className="todo navLink">
                    <span className="logo"></span>
                    To-do List
                </NavLink>
                <NavLink className="notes navLink">
                    <span className="logo"></span>
                    Notes
                </NavLink>
                <NavLink className="login navLink">
                    <span className="logo"></span>
                    Log In
                </NavLink>
            </div>
            <FilterMenu
                display={state.filter_display}
                onClick={() => {
                    setState({
                        ...state,
                        filter_display: !state.filter_display,
                    });
                }}
                filter={(category) => {
                    if (key === "/notes") {
                        let filtered_notes = filter(notes, category.name);
                        setContext({
                            ...context,
                            notes: filtered_notes,
                            notes_category: category.name,
                        });
                        return;
                    }

                    let filtered_tasks = filter(tasks, category.name);
                    setContext({
                        ...context,
                        tasks: filtered_tasks,
                        tasks_category: category,
                    });
                    return;
                }}
            />
            <Outlet context={[context, setContext]} />
            <Edit />
        </div>
    );
}

function FilterMenu({ display, onClick, filter }) {
    const categories = useSelector((state) => state.categories);
    const options = categories.map((item) => {
        return (
            <span
                key={Math.random() + item.name}
                className="filter_option"
                onClick={() => filter(item)}
            >
                {item.name}
                <span
                    style={{ backgroundColor: item.color }}
                    className="filter_color"
                />
            </span>
        );
    });

    return (
        <div
            style={{ display: display ? "flex" : "none" }}
            className="filter_menu"
        >
            <span className="filter_close" onClick={onClick}>
                <Xicon className="filter_x" />
            </span>
            <span className="filter_option">
                All
                <span className="filter_color" />
            </span>
            {options}
        </div>
    );
}

export default Home;

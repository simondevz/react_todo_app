import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Home from "./home/home";
import List from "./list/list";
import Notes from "./notes/notes";
import Input from "./input/input";

// Urgent will be more of a filter thing
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} >
                    <Route index element={<List />} />
                    <Route path="/tasks" element={<List />} />
                    <Route path="/notes" element={<Notes />} />
                </Route>
                <Route path="/create" element={<Input />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import TodoRoutes from "./components/todo/js/TodoRoutes";

import "./styles.css";

function App() {
    return(
        <div>
            <Router>
                <Routes>
                    <Route path={"/*"} element={<TodoRoutes />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App;

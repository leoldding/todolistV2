import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TodoLogin from "./TodoLogin";
import TodoUser from "./TodoUser";

function TodoRoutes() {
    // set index elements
    useEffect(() => {
        let icon = document.getElementById("icon")
        // icon.href = process.env.PUBLIC_URL + ""

        let apple_icon = document.getElementById("apple_icon")
        // apple_icon.href = process.env.PUBLIC_URL + ""

        // document.body.className = "";
    }, []);

    return (
        <div className={"h-screen"}>
            <Routes>
                <Route path={""} element={<TodoLogin /> }/>
                <Route path={"/user/*"} element={<TodoUser />} />
                <Route path={"*"} element={<Navigate to="" replace />} />
            </Routes>
        </div>
    )
}

export default TodoRoutes;

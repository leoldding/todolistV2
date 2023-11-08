import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TodoLogin from "./account/Login";
import TodoRegister from "./account/Register";
import TodoUser from "./lists/Users";
import { checkSession } from "./api";

function TodoRoutes() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");

    // set index elements
    useEffect(() => {
        let icon = document.getElementById("icon")
        icon.href = process.env.PUBLIC_URL + "list_icon.png"

        let apple_icon = document.getElementById("apple_icon")
        apple_icon.href = process.env.PUBLIC_URL + "list_icon.png"
    }, []);

    useEffect(() => {
        checkSession()
            .then((res) => {
                setUsername(res.data)
                setLoggedIn(true);
            })
            .catch((err) => {
                setLoggedIn(false);
                console.log(err)
            })
    })

    return (
        <div className={"h-screen"}>
            <Routes>
                <Route path={"login"} element={!loggedIn ? <TodoLogin setLoggedIn={setLoggedIn} setUsername={setUsername}/> : <Navigate to={"/user/"+username} /> }/>
                <Route path={"register"} element={!loggedIn ? <TodoRegister /> : <Navigate to={"/user/"+username} /> }/>
                <Route path={"user/:username"} element={loggedIn ? <TodoUser /> : <Navigate to={"/login"} /> }/>
                <Route path={"*"} element={<Navigate to={"/login"} replace />} />
            </Routes>
        </div>
    )
}

export default TodoRoutes;

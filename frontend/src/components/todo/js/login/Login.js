import React, { useEffect, useState } from "react";
import { login } from "../api";

function TodoLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // set document title
    useEffect(() => {
        document.title = "Leo Ding - Todo Login";
    }, []);

    const submitLogin = (event) => {
        event.preventDefault();

        let empty = false;

        if (password === "") {
            setPasswordError("Required");
            empty = true;
        } else {
            setPasswordError("");
        }

        if (username === "") {
            setUsernameError("Required");
            empty = true;
        } else {
            setUsernameError("");
        }

        if (!empty) {
            login(username.trim(), password.trim())
                .then((res) => {
                    window.location.assign(window.location.protocol + "//" + window.location.host + "/user/" + username);
                    setUsername("");
                    setPassword("");
                    setUsernameError("");
                    setPasswordError("");
                })
                .catch((err) => {
                    if (err.response.status === 400) {
                        setUsernameError("Invalid User")
                        setPasswordError("")
                    } else if (err.response.status === 401) {
                        setUsernameError("")
                        setPasswordError("Incorrect Password")
                    }
                })
        }
    }

    return(
        <div>
            <h1>User Login</h1>
            <form onSubmit={submitLogin}>
                <div>
                    <input type={"text"}
                           placeholder={"Username"} value={username}
                           onChange={(event) => setUsername(event.target.value)}/>
                    <div>{usernameError}</div>
                </div>
                <div>
                    <input type={"password"}
                           placeholder={"Password"} value={password}
                           onChange={(event) => setPassword(event.target.value)}/>
                    <div>{passwordError}</div>
                </div>
                <button>Login</button>
            </form>
        </div>
    )
}

export default TodoLogin;

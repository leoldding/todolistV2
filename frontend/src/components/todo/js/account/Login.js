import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../api";

function TodoLogin(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [remember, setRemember] = useState(false);

    // set document title
    useEffect(() => {
        document.title = "Leo Ding - Todo Login";
    }, []);

    const textValid = (text) => {
        return /^[a-z0-9_.]+$/.exec(text);
    }

    const submitLogin = (event) => {
        event.preventDefault();

        let viable = true;

        if (username === "") {
            setUsernameError("Required");
            viable = false;
        } else if (!textValid(username)) {
            setUsernameError("Invalid User")
            viable = false;
        } else {
            setUsernameError("");
        }

        if (password === "") {
            setPasswordError("Required");
            viable = false;
        } else if (!textValid(password)) {
            setPasswordError("Incorrect Password")
            viable = false;
        } else {
            setPasswordError("");
        }

        if (viable) {
            login(username, password, remember)
                .then(() => {
                    props.setUsername(username);
                    props.setLoggedIn(true);
                    setUsername("");
                    setPassword("");
                    setUsernameError("");
                    setPasswordError("");
                })
                .catch((err) => {
                    props.setLoggedIn(false);
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
                <div>
                    <div>Remember Me</div>
                    <input type={"checkbox"} onChange={(event) => setRemember(event.target.checked)}/>
                </div>
                <button>Sign In</button>
            </form>
            <Link to={"/register"}>Sign Up</Link>
        </div>
    )
}

export default TodoLogin;

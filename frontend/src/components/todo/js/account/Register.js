import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { register } from "../api";

function TodoRegister() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordConfirmError, setPasswordConfirmError] = useState("");
    const [registered, setRegistered] = useState(false);

    // set document title
    useEffect(() => {
        document.title = "Leo Ding - Todo Register";
    }, []);

    const textValid = (text) => {
        return /^[a-z0-9_.]+$/.exec(text);
    }

    const submitRegister = (event) => {
        event.preventDefault();

        let viable = true;

        if (username === "") {
            setUsernameError("Required");
            viable = false;
        } else if (!textValid(username)) {
            setUsernameError("Invalid Username");
            viable = false
        } else {
            setUsernameError("");
        }

        if (password === "") {
            setPasswordError("Required");
            viable = false;
        } else if (!textValid(password)) {
            setPasswordError("Invalid Password");
            viable = false;
        } else {
            setPasswordError("");
        }

        if (passwordConfirm === "") {
            setPasswordConfirmError("Required");
            viable = false;
        } else  if (password !== passwordConfirm) {
            setPasswordConfirmError("Passwords Must Match")
            viable = false;
        } else {
            setPasswordError("");
        }

        if (viable) {
            register(username, password)
                .then(() => {
                    setRegistered(true);
                    setUsername("");
                    setPassword("");
                    setPasswordConfirm("");
                    setUsernameError("");
                    setPasswordError("");
                    setPasswordConfirmError("");
                })
                .catch((err) => {
                    if (err.response.status === 400) {
                        setUsernameError("User Already Exists");
                        setPasswordError("");
                        setPasswordConfirmError("");
                    }
                })
        }
    }

    return (
        <div>
            <h1>User Registration</h1>
            <form onSubmit={submitRegister}>
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
                    <input type={"password"}
                           placeholder={"Confirm Password"} value={passwordConfirm}
                           onChange={(event) => setPasswordConfirm(event.target.value)}/>
                    <div>{passwordConfirmError}</div>
                </div>
                <button>Sign Up</button>
            </form>
            <Link to={"/"}>Sign In</Link>
            { registered ? <Navigate to={"/"} replace /> : null }
        </div>
    )
}

export default TodoRegister;

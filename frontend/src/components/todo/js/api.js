import Axios from "axios";

export const login = (username, password, remember) => {
    return Axios.post("/backend/todoLogin", {
        username: username,
        password: password,
        remember: remember
    })
        .then((res) => {
            if (res.status === 200) {
                return null
            } else if (res.status === 400) {
                throw new Error("Invalid User")
            } else if (res.status === 401) {
                throw new Error("Incorrect Password")
            }
        })
}

export const register = (username, password) => {
    return Axios.post("/backend/todoRegister", {
        username: username,
        password: password
    })
        .then((res) => {
            if (res.status === 200) {
                return null
            } else if (res.status === 400) {
                throw new Error("User Exists Already")
            }
        })
}

export const checkSession = () => {
    return Axios.get('/backend/todoCheckSession')
        .then((res) => {
            if (res.status === 200) {
                return res
            } else {
                throw new Error("Unauthorized User")
            }
        })
}

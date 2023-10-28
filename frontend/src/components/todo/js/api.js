import Axios from "axios";

export const login = (username, password) => {
    return Axios.post("/backend/todoLogin", {
        username: username,
        password: password
    })
        .then((res) => {
            if (res.status === 200) {
                return null
            } else if (res.status === 400) {
                throw new Error("Invalid User")
            } else {
                throw new Error("Incorrect Password")
            }
        })
}
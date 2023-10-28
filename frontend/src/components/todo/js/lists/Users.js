import React, { useEffect } from "react";

function TodoUser() {

    // set document title
    useEffect(() => {
        document.title = "Leo Ding - Todo List";
    }, []);

    return(
        <div>
            <h1>
                LIST PAGE
            </h1>
        </div>
    )
}

export default TodoUser;

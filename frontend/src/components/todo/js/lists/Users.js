import React, { useEffect } from "react";
import TodoLists from "./Lists";
import TodoMobileLists from "./MobileLists";
import TodoTasks from "./Tasks";
import TodoSettings from "./Settings";

function TodoUser(props) {

    // set document title
    useEffect(() => {
        document.title = "Leo Ding - Todo List";
    }, []);

    return(
        <div className={"h-full w-full text-neutral-900"}>
            <div className={"md:hidden h-[55px] border-b-4 border-sky-400 bg-sky-200"} />
            <TodoMobileLists />
            <TodoSettings setLoggedIn={props.setLoggedIn} />

            <div className={"h-[calc(100%-55px)] md:h-full w-full flex flex-row bg-sky-50"}>
                <TodoLists />
                <TodoTasks />
            </div>
        </div>
    )
}

export default TodoUser;

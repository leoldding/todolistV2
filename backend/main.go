package main

import (
	"github.com/leoldding/todolistV2/database"
	"github.com/leoldding/todolistV2/todo"
	"net/http"
)

func main() {
	http.HandleFunc("/ping", ping)

	database.ConnectToPostgres()

	todo.DatabaseInitialize()

	http.HandleFunc("/todoLogin", todo.Login)
	http.HandleFunc("/todoRegister", todo.Register)

	http.ListenAndServe(":8080", nil)
	return
}

func ping(w http.ResponseWriter, _ *http.Request) {
	w.WriteHeader(http.StatusOK)
	return
}

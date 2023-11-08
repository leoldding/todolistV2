package todo

import (
	"encoding/json"
	"github.com/leoldding/todolistV2/database"
	"log"
	"net/http"
)

func CheckSession(w http.ResponseWriter, r *http.Request) {
	// retrieve cookie
	sessionToken, err := r.Cookie("todoSessionToken")
	if err != nil {
		log.Printf("Cookie does not exist.\nERROR: %v", err)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	// check if session exists
	var username string
	if err := database.Postgres.QueryRow("SELECT username FROM todoSessions WHERE sessionId = $1;", sessionToken.Value).Scan(&username); err != nil {
		log.Printf("Session does not exist.\nERROR: %v", err)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	send, err := json.Marshal(username)
	if err != nil {
		log.Printf("JSON marshal error.\nERROR: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Write(send)

	return
}

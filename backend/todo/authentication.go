package todo

import (
	"database/sql"
	"encoding/json"
	"errors"
	"github.com/google/uuid"
	"github.com/leoldding/todolistV2/database"
	"golang.org/x/crypto/bcrypt"
	"log"
	"net/http"
	"time"
)

type LoginInfo struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Remember bool   `json:"remember"`
}

type RegisterInfo struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func Login(w http.ResponseWriter, r *http.Request) {
	var info LoginInfo

	// retrieve and bind login credentials
	if err := json.NewDecoder(r.Body).Decode(&info); err != nil {
		log.Printf("Login JSON decoding error.\nERROR: %v")
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// retrieve the stored password hash based on given username
	var password []byte
	if err := database.Postgres.QueryRow("SELECT password FROM todoUsers WHERE username = $1;", info.Username).Scan(&password); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			log.Printf("User doesn't exist.\nERROR: %v", err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// compare stored hash and inputted password
	if err := bcrypt.CompareHashAndPassword(password, []byte(info.Password)); err != nil {
		log.Printf("Password hashes don't match.\nERROR: %v", err)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	// create session token
	sessionToken := uuid.New().String()
	expiresAt := time.Now()

	if info.Remember {
		expiresAt = expiresAt.Add(168 * time.Hour) // one week
	} else {
		expiresAt = expiresAt.Add(30 * time.Minute)
	}

	// insert session token values into database
	if _, err := database.Postgres.Exec("INSERT INTO todoSessions(sessionId, username, expiration) VALUES ($1, $2, $3);", sessionToken, info.Username, expiresAt); err != nil {
		log.Printf("Error inserting new session into todoSessions table.\nERROR: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// set cookie
	http.SetCookie(w, &http.Cookie{
		Name:     "todoSessionToken",
		Value:    sessionToken,
		Expires:  expiresAt,
		HttpOnly: true,
		Path:     "/",
	})

	w.WriteHeader(http.StatusOK)

	return
}

func Register(w http.ResponseWriter, r *http.Request) {
	var info RegisterInfo

	// retrieve and bind credentials from json
	if err := json.NewDecoder(r.Body).Decode(&info); err != nil {
		log.Printf("Register JSON decoding error.\nERROR: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// check if username already exists
	var exists bool
	if err := database.Postgres.QueryRow("SELECT COUNT(*) FROM todoUsers WHERE username = $1;", info.Username).Scan(&exists); err != nil {
		if !errors.Is(err, sql.ErrNoRows) {
			log.Printf("Postgres username query error.\nERROR: %v", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	}

	if exists {
		log.Printf("Username already exists.")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// create password hash
	passwordHash, err := bcrypt.GenerateFromPassword([]byte(info.Password), 8)
	if err != nil {
		log.Printf("Password hash generation error.\nERROR: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// insert new user into database
	if _, err := database.Postgres.Exec("INSERT INTO todoUsers(username, password) VALUES ($1, $2)", info.Username, passwordHash); err != nil {
		log.Printf("Error inserting user into todoUsers table.\nERROR: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	return
}

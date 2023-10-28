package todo

import (
	"github.com/leoldding/todolistV2/database"
	_ "github.com/lib/pq"
	"log"
)

func DatabaseInitialize() {
	_, err := database.Postgres.Exec("CREATE TABLE IF NOT EXISTS todoUsers(username VARCHAR(255) PRIMARY KEY, password VARCHAR(255));")
	if err != nil {
		log.Printf("Error creating todoUsers table.\nERROR: %v", err)
		return
	}

	_, err = database.Postgres.Exec("CREATE TABLE IF NOT EXISTS todoSessions(sessionId VARCHAR(255) PRIMARY KEY, username VARCHAR(255), expiration TIMESTAMP WITH TIME ZONE, CONSTRAINT fk_username FOREIGN KEY(username) REFERENCES todoUsers(username));")
	if err != nil {
		log.Printf("Error creating todoSessions table.\nERROR: %v", err)
		return
	}

	_, err = database.Postgres.Exec("CREATE TABLE IF NOT EXISTS todoLists(listId SERIAL PRIMARY KEY, username VARCHAR(255), listName VARCHAR(255), CONSTRAINT fk_username FOREIGN KEY(username) REFERENCES todoUsers(username));")
	if err != nil {
		log.Printf("Error creating todoLists table.\nERROR: %v", err)
		return
	}

	_, err = database.Postgres.Exec("CREATE TABLE IF NOT EXISTS todoItems(itemId SERIAL PRIMARY KEY, listId INT, itemName VARCHAR(255), CONSTRAINT fk_listId FOREIGN KEY(listId) REFERENCES todoLists(listId));")
	if err != nil {
		log.Printf("Error creating todoItems table.\nERROR: %v", err)
		return
	}

	return
}

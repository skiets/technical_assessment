package main

import (
	"log"
	"net/http"
	"technical_assessment/config"
	"technical_assessment/controllers"
	"technical_assessment/middleware"

	"github.com/gorilla/mux"
)

func main() {
	config.ConnectDB()

	r := mux.NewRouter()

	r.Use(middleware.Cors)

	// Routes
	r.HandleFunc("/api/register", controllers.RegisterUser).Methods("POST", "OPTIONS")
	r.HandleFunc("/api/login", controllers.Login).Methods("POST", "OPTIONS")
	r.HandleFunc("/api/post", controllers.CreatePost).Methods("POST", "OPTIONS")
	r.HandleFunc("/api/home", controllers.GetAllPosts).Methods("GET", "OPTIONS")
	r.PathPrefix("/uploads/").Handler(http.StripPrefix("/uploads/", http.FileServer(http.Dir("uploads"))))

	log.Println("Server running at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}

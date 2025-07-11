package controllers

import (
	"context"
	"encoding/json"
	"net/http"
	"strings"
	"technical_assessment/config"
	"technical_assessment/models"
	"technical_assessment/utils"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func RegisterUser(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Credentials", "true")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	var input struct {
		Name  string `json:"fullname"`
		Email string `json:"email"`
		Pass  string `json:"pass"`
		Cpass string `json:"cpass"`
	}

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {

		http.Error(w, "Passwords do not match", http.StatusBadRequest)

		return
	}

	// Check for existing email
	collection := config.GetCollection("users")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var existing models.Users
	err := collection.FindOne(ctx, bson.M{"email": input.Email}).Decode(&existing)
	if err == nil {

		http.Error(w, "Email already registered", http.StatusBadRequest)
		return
	}

	hashedPassword := utils.HashPassword(input.Pass)

	user := models.Users{
		ID:        primitive.NewObjectID(),
		Name:      strings.ToLower(input.Name),
		Email:     input.Email,
		Password:  hashedPassword,
		Status:    "active",
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	_, err = collection.InsertOne(ctx, user)
	if err != nil {
		http.Error(w, "Failed to register user", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{
		"message": "User registered successfully",
	})
}

package controllers

import (
	"context"
	"encoding/json"
	"net/http"
	"technical_assessment/config"
	"technical_assessment/models"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GetAllPosts(w http.ResponseWriter, r *http.Request) {
	// Set headers
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173") // Adjust if needed
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	// MongoDB collection
	collection := config.GetCollection("posts")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Optional: only fetch published posts
	filter := bson.M{"status": "published"}

	// Optional: sort by most recent
	findOptions := options.Find()
	findOptions.SetSort(bson.D{{Key: "created_at", Value: -1}})

	// Fetch documents
	cursor, err := collection.Find(ctx, filter, findOptions)
	if err != nil {
		http.Error(w, "Failed to fetch posts", http.StatusInternalServerError)
		return
	}
	defer cursor.Close(ctx)

	var posts []models.Post
	if err := cursor.All(ctx, &posts); err != nil {
		http.Error(w, "Error decoding posts", http.StatusInternalServerError)
		return
	}

	// Respond with posts as JSON
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(posts)
}

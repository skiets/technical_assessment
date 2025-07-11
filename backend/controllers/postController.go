package controllers

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"os"
	"technical_assessment/config"
	"technical_assessment/models"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreatePost(w http.ResponseWriter, r *http.Request) {
	// Parse form data (set max upload size to 20MB)
	err := r.ParseMultipartForm(20 << 20)
	if err != nil {
		http.Error(w, "Error parsing form data", http.StatusBadRequest)
		return
	}

	title := r.FormValue("title")
	description := r.FormValue("description")

	// Get file from the request
	file, handler, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "Error retrieving file", http.StatusBadRequest)
		return
	}
	defer file.Close()

	// Save file to local disk (or upload to cloud storage)
	fileName := fmt.Sprintf("uploads/%d_%s", time.Now().UnixNano(), handler.Filename)
	dst, err := os.Create(fileName)
	if err != nil {
		http.Error(w, "Unable to save file", http.StatusInternalServerError)
		return
	}
	defer dst.Close()

	_, err = io.Copy(dst, file)
	if err != nil {
		http.Error(w, "Failed to save file", http.StatusInternalServerError)
		return
	}

	// Create Post object
	post := models.Post{
		ID:          primitive.NewObjectID(),
		Title:       title,
		Description: description,
		ImageURL:    "/" + fileName, // or use full URL if needed
		UserID:      nil,            // for now, no user
		Status:      "published",    // default
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	// Insert post into DB
	collection := config.GetCollection("posts")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	_, err = collection.InsertOne(ctx, post)
	if err != nil {
		http.Error(w, "Failed to save post", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	fmt.Fprint(w, `{"message": "Post created successfully"}`)
}

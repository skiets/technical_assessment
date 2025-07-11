package config

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Database

func ConnectDB() {
	// Load environment
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	uri := os.Getenv("MONGO_URI")
	dbName := os.Getenv("DB_NAME")

	if uri == "" || dbName == "" {
		log.Fatal("Missing MONGO_URI or DB_NAME in environment")
	}

	// Create context with timeout
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Use mongo.Connect instead of NewClient + Connect
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatal("MongoDB connection error:", err)
	}

	// Optional: Check if connection is alive
	if err := client.Ping(ctx, nil); err != nil {
		log.Fatal("Failed to ping MongoDB:", err)
	}

	// Assign DB reference
	DB = client.Database(dbName)
}

// get tables
func GetCollection(collectionName string) *mongo.Collection {
	return DB.Collection(collectionName)
}

package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Post struct {
	ID          primitive.ObjectID  `json:"id,omitempty" bson:"_id,omitempty"`
	Title       string              `json:"title" bson:"title"`
	Description string              `json:"description" bson:"description"`
	ImageURL    string              `json:"image_url" bson:"image_url"`
	UserID      *primitive.ObjectID `json:"user_id,omitempty" bson:"user_id,omitempty"` // pointer makes it optional
	Status      string              `json:"status" bson:"status"`
	CreatedAt   time.Time           `json:"created_at" bson:"created_at"`
	UpdatedAt   time.Time           `json:"updated_at" bson:"updated_at"`
}

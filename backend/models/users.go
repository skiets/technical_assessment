package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Users struct {
	ID        primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Email     string             `json:"email" bson:"email"`
	Password  string             `json:"password,omitempty" bson:"password"`
	Name      string             `json:"name" bson:"name"`
	Status    string             `json:"status" bson:"status"`
	CreatedAt time.Time          `json:"created_at" bson:"created_at"`
	UpdatedAt time.Time          `json:"updated_at" bson:"updated_at"`
}

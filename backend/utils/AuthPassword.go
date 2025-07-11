package utils

import "golang.org/x/crypto/bcrypt"

func HashPassword(password string) string {
	hashed, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	if err != nil {
		panic("failed to hash password: " + err.Error())
	}
	return string(hashed)
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

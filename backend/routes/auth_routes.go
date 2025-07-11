package routes

import (
	"technical_assessment/controllers"

	"github.com/gin-gonic/gin"
)

func AuthRoutes(r *gin.Engine) {
	auth := r.Group("/api")
	{
		auth.POST("/login", controllers.Login)
	}
}

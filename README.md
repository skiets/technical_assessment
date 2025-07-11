/project-root
├── /backend
│   ├── controllers/
│   |   ├── authController.go
│   |   ├── homeController.go
│   |   ├── postController.go
│   |   ├── usersController.go
│   ├── models/
│   |   ├── posts.go
│   |   ├── users.go
│   ├── middleware/
│   |   ├── cors.go
│   ├── config/
│   ├── utils/
│   |   ├── AuthPassword.go
│   ├── main.go
├── /frontend
│   ├── src/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── index.html
│   ├── vite.config.js


A. Requirements
Go (v1.18+)

MongoDB running locally

Postman or frontend to test

Folder: /backendA. Requirements
Go (v1.18+)

MongoDB running locally (or via MongoDB Atlas)

Postman or frontend to test



📂 4. HOW TO TEST
Start MongoDB server

Run backend
go run main.go

cd frontend
npm install
npm run dev

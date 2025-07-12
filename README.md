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


🔧 Step 1: Create Database in MongoDB Compass

Open MongoDB Compass.

In the connection string field, use:

**mongodb://localhost:27017**

Once connected, click “+ Create Database”:

Database Name: technical_assessment_db

Collection Name: users (or any default collection you want)

Click Create Database.

🔐 Step 2: Configure .env File
Go to your project’s backend/ folder.

Create a file named .env if it doesn't already exist.

 Step 3: now go to cd backend
Install dependencies (if not yet):
go mod tidy

Run the backend server:
go run main.go

check if they connected
Connected to MongoDB: technical_assessment_db
Server running on http://localhost:8080



now lets proceed in front end
type npm install for dependencides
npm run dev for run in http://localhost:****

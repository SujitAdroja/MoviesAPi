# 🎬 Movies API

A simple yet powerful **RESTful Movies API** built with **Node.js, Express, and MongoDB**.  
This project demonstrates CRUD operations, pagination, error handling, and Swagger API documentation.  

🔗 Hosted API on Render: [https://moviesapi-zhkp.onrender.com](https://moviesapi-zhkp.onrender.com)  
📖 Swagger Docs: [Swagger UI](https://moviesapi-zhkp.onrender.com/api-docs)

---

## 🛠️ Tech Stack
- **Node.js** – JavaScript runtime  
- **Express.js** – Web framework  
- **MongoDB** – NoSQL database  
- **Mongoose** – ODM for MongoDB  
- **Jest & Supertest** – For testing  

---

## 🚀 Features
- ➕ Add new movies  
- 📜 Get all movies (with pagination support)  
- 🔍 Get movie by ID  
- ✏️ Update existing movie  
- ❌ Delete a movie  
- 📖 Interactive Swagger Documentation  

---

## 📂 API Endpoints

| Method | Endpoint                      | Description                   |
|--------|-------------------------------|-------------------------------|
| GET    | `/movies`                     | Get all movies                |
| GET    | `/movies?page=1&limit=10`     | Get movies with pagination    |
| POST   | `/movies`                     | Add a new movie               |
| GET    | `/movies/:id`                 | Get a movie by ID             |
| PUT    | `/movies/:id`                 | Update a movie by ID          |
| DELETE | `/movies/:id`                 | Delete a movie by ID          |

---

## ⚙️ Installation & Setup

1. Clone the repo  
   ```bash
   git clone https://github.com/your-username/movies-api.git
   cd movies-api

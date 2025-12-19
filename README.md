# Todo App Backend (Node.js, Prisma, JWT, Docker)

This repository contains the **backend API** for a Todo application.  
It provides user authentication using **JWT**, database access via **Prisma**, and is fully **Dockerized** for easy setup and deployment.

> ⚠️ The frontend UI was provided as part of a YouTube tutorial.  
> This repository focuses on the backend implementation.

---

## Features

- User registration and login
- Secure password hashing
- JWT-based authentication and authorization
- Protected API routes
- Create, read, update, and delete todos
- User-specific todo data
- Prisma ORM for database management
- Docker and Docker Compose support

---

## Tech Stack

- Node.js
- Express
- Prisma ORM
- JSON Web Tokens (JWT)
- Docker
- PostgreSQL

---

## Requirements

- **Docker & Docker Compose**

---

## Running the Program
1. First clone this repo
```bash
git clone https://github.com/Kent-Wal/Todo-App.git
```
2. Enter the project directory
```bash
cd Todo-App
```
3. Change the name of the .env.example file to .env
```bash
mv .env.example .env
```
4. Start the Docker containers

```bash
docker compose up --build
```
5. Open your browser and go to: [http://localhost:5000](http://localhost:5000)
6. Enjoy the app!

---

## License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.


# Learn REST API with Node.js, Express & MySQL

A beginner-friendly REST API project for learning how to build CRUD APIs with **Node.js**, **Express**, and **MySQL**.

## Tech Stack

- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js v5
- **Database:** MySQL
- **Driver:** mysql2
- **Dev Tool:** Nodemon (auto-restart on file changes)

## Project Structure

```
Learn-REST-API/
├── config/
│   └── db.js              # MySQL connection pool
├── controllers/
│   └── usersController.js # Business logic for users
├── routes/
│   └── users.js           # Route definitions
├── server.js              # Entry point
├── package.json
└── .gitignore
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MySQL](https://dev.mysql.com/downloads/mysql/) installed and running

## Setup

### 1. Clone the repo

```bash
git clone <repo-url>
cd Learn-REST-API
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up MySQL

Start MySQL and log in:

```bash
sudo service mysql start
mysql -u root -p
```

Create the database, user, and table:

```sql
CREATE DATABASE rest_api_db;

CREATE USER 'apiuser'@'localhost' IDENTIFIED BY 'yourpassword';
GRANT ALL PRIVILEGES ON rest_api_db.* TO 'apiuser'@'localhost';
FLUSH PRIVILEGES;

USE rest_api_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  age INT NOT NULL,
  married BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, age, married) VALUES
('Alice', 28, TRUE),
('Bob', 34, FALSE),
('Charlie', 41, TRUE),
('Diana', 23, FALSE),
('Ethan', 37, TRUE);
```

### 4. Update database config

Edit `config/db.js` with your MySQL credentials:

```js
const pool = mysql.createPool({
  host: "localhost",
  user: "apiuser",       // your MySQL username
  password: "yourpassword", // your MySQL password
  database: "rest_api_db",
});
```

### 5. Start the server

```bash
npm run dev
```

You should see:

```
MySQL connected successfully
Server running on http://localhost:3000
```

## API Endpoints

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| GET | `/users` | Get all users | - |
| POST | `/users` | Create a new user | `{ "name": "John", "age": 30, "married": false }` |
| PUT | `/users/:id` | Update a user by ID | `{ "name": "John Updated", "married": true }` |
| DELETE | `/users/:id` | Delete a user by ID | - |

## Testing with cURL

### Get all users

```bash
curl http://localhost:3000/users
```

### Create a new user

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Frank", "age": 45, "married": true}'
```

### Update a user

```bash
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice Updated", "married": false}'
```

### Delete a user

```bash
curl -X DELETE http://localhost:3000/users/1
```

## Key Concepts Covered

- **RESTful design** - Proper HTTP methods and status codes
- **CRUD operations** - Create, Read, Update, Delete
- **Modular architecture** - Separate routes, controllers, and config
- **MySQL integration** - Connection pooling and parameterized queries
- **Error handling** - 404 responses for not found resources
- **ES Modules** - Modern `import/export` syntax

## License

ISC

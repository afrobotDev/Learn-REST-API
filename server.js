import express from "express";
import usersRouter from "./routes/users.js";
import pool from "./config/db.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/users", usersRouter);

pool
  .getConnection()
  .then((conn) => {
    console.log("MySQL connected successfully");
    conn.release();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MySQL:", err.message);
    process.exit(1);
  });

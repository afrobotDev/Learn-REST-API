import express from "express";
import usersRouter from "./routes/users.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

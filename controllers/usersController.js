import pool from "../config/db.js";

export const getUsers = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM users");
  res.json(rows);
};

export const createUser = async (req, res) => {
  const { name, age, married } = req.body;
  const [result] = await pool.query(
    "INSERT INTO users (name, age, married) VALUES (?, ?, ?)",
    [name, age, married]
  );
  const [newUser] = await pool.query("SELECT * FROM users WHERE id = ?", [
    result.insertId,
  ]);
  res.status(201).json(newUser[0]);
};

export const updateUser = async (req, res) => {
  const id = Number(req.params.id);
  const { name, married } = req.body;
  const [result] = await pool.query(
    "UPDATE users SET name = COALESCE(?, name), married = COALESCE(?, married) WHERE id = ?",
    [name, married, id]
  );
  if (result.affectedRows === 0) {
    return res.status(404).json({ error: "User not found" });
  }
  const [updatedUser] = await pool.query("SELECT * FROM users WHERE id = ?", [
    id,
  ]);
  res.json(updatedUser[0]);
};

export const deleteUser = async (req, res) => {
  const id = Number(req.params.id);
  const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
  if (result.affectedRows === 0) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json({ message: "User deleted successfully" });
};

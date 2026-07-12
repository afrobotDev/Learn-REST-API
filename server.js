import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

const people = [
  {
    id: 1,
    name: "Alice",
    age: 28,
    married: true,
  },
  {
    id: 2,
    name: "Bob",
    age: 34,
    married: false,
  },
  {
    id: 3,
    name: "Charlie",
    age: 41,
    married: true,
  },
  {
    id: 4,
    name: "Diana",
    age: 23,
    married: false,
  },
  {
    id: 5,
    name: "Ethan",
    age: 37,
    married: true,
  },
];

app.get("/users", (req, res) => {
  res.json(people);
});

app.post("/users", (req, res) => {
  const newUser = req.body;
  people.push(newUser);
  res.status(201).json(newUser);
});

app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, married } = req.body;
  let updatedUser = null;
  for (const user of people) {
    if (user.id === id) {
      if (name !== undefined) user.name = name;
      if (married !== undefined) user.married = married;
      updatedUser = { ...user };
    }
  }
  if (!updatedUser) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(updatedUser);
});

app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = people.findIndex((user) => user.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  people.splice(index, 1);
  res.json({ message: "User deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

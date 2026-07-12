import people from "../models/people.js";

export const getUsers = (req, res) => {
  res.json(people);
};

export const createUser = (req, res) => {
  const newUser = req.body;
  people.push(newUser);
  res.status(201).json(newUser);
};

export const updateUser = (req, res) => {
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
};

export const deleteUser = (req, res) => {
  const id = Number(req.params.id);
  const index = people.findIndex((user) => user.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  people.splice(index, 1);
  res.json({ message: "User deleted successfully" });
};

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 2000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
// server
app.listen(PORT, () => {
  console.log(`Server is running on
     port ${PORT}`);
});

let Todos = [
  {
    id: "1",
    text: "todo list ",
    isCompleted: true
  },
  {
    id: "2",
    text: "I am Todo list ",
    isCompleted: false
  }
];

// READ
app.get("/", (req, res) => {
  res.json(Todos);
});

//CREATE

app.post("/", (req, res) => {
  const { text, isCompleted } = req.body;
  const addTodo = {
    id: Math.floor(Math.random() * 300).toString(),
    text,
    isCompleted
  };
  Todos.push(addTodo);

  res.status(201).send("Todo added successfully");
});

app.put("/:id", (req, res) => {
  const { text, isCompleted } = req.body;
  let id = req.params.id;
  const todoIndex = Todos.findIndex((el) => el.id === id);
  if (todoIndex !== -1) {
    Todos[todoIndex] = {
      ...Todos[todoIndex],
      text: text,
      isCompleted: isCompleted
    };
  }
  res.status(201).send("Todo Updated successfully");
});

app.delete("/:id", (req, res) => {
  let id = req.params.id;
  const todoIndex = Todos.find((el) => el.id === id);
  if (todoIndex === undefined) {
    res.status(404).send("Todo Not Found();");
  } else {
    const newFilterTof = Todos.filter((el) => el.id !== id);
    Todos = newFilterTof;
    res.status(201).send("Deleted Updated successfully");
  }
});

const router = require("express").Router();
const { User, Todo } = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  authenticateUser,
  userSchema,
  todoSchema,
} = require("../middleware/authMiddleware");
const validate = require("../middleware/validation");
const SECRET = process.env.SECRET;

router.post("/signup", validate(userSchema), async (req, res) => {
  const { username, password } = req.body;
  try {
    const isUserExist = await User.findOne({ username });
    if (isUserExist) {
      return res.status(409).json({ message: "User already exits" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });
    res
      .status(201)
      .json({ message: "User created successfully", token, id: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.post("/signin", validate(userSchema), async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!(user || isPasswordValid)) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });
    res.status(200).json({
      message: "Logged in successfully",
      token: token,
      id: user._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.use(authenticateUser);

router.post("/todo", validate(todoSchema), async (req, res) => {
  const { title, description, completed } = req.body;
  try {
    const newTodo = await Todo.create({
      title,
      description,
      completed,
    });
    res
      .status(201)
      .json({ message: "Todo created successfully", todoId: newTodo._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.put("/todos/:todoId", validate(todoSchema), async (req, res) => {
  const todoId = req.params.todoId;
  const { title, description, completed } = req.body;
  try {
    await Todo.findByIdAndUpdate(
      todoId,
      {
        title,
        description,
        completed,
      },
      {
        new: true,
      }
    );
    res.status(200).json({ message: "Todo updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.status(200).json(todos);
});

router.delete("/todos/:todoId", async (req, res) => {
  const todoId = req.params.todoId;
  try {
    const todo = await Todo.findByIdAndDelete(todoId);
    res.status(200).json({ message: "Todo delted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
